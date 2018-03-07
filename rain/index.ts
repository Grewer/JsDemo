(() => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    const W: number = window.innerWidth;
    const H: number = window.innerHeight;

    const pixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    const ratio = pixelRatio / backingStoreRatio;

    canvas.width = W * ratio;
    canvas.height = H * ratio;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    ctx.scale(ratio, ratio);


    const halfWidth = W / 2;
    let offsetAngle: number = 0;

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    /* 指定几个颜色 */
    grad.addColorStop(0, '#688896');
    grad.addColorStop(1, '#2b2623');

    const rainFrequency = H / 6;

    let leftOrRight: number = 1; // -1->left  1->right

    interface coordinateType {
        x: number
        y: number
    }

    interface rainType {
        pos: coordinateType
        height: number
        drops: boolean
        speed: number
    }

    let store: rainType[] = [];

    interface dropsType {
        pos: coordinateType
        fn: Function
        speed: number
        radius: number
        path: number
    }

    let dropsStore: dropsType[] = [];

    let dropsCache = {};
    ctx.strokeStyle = "#6EACEC";

    ctx.moveTo(0, 0);
    const getParabolaFunc = ({px, py}, {x = 0, y = 0}): Function => {
        const isExist = dropsCache[`${px}-${py}-${x}-${y}`];
        if (isExist) {
            return isExist;
        }
        const a: number = (y - py) / Math.pow(x - px, 2),
            b: number = 2 * -px * a,
            c: number = px * px * a + py;
        dropsCache[`${px}-${py}-${x}-${y}`] = (x) => {
            return a * x * x + b * x + c;
        };
        return dropsCache[`${px}-${py}-${x}-${y}`]
    };

    const addDrops = (x, time) => {
        let i = Math.random() * 5 + 5 | 0;
        while (i--) {
            const offsetX = Math.random() * 50 - 25;
            const speed = offsetX > 0 ? 0.15 : -0.15;
            dropsStore.push(
                {
                    pos: {x, y: H},
                    fn: getParabolaFunc({px: offsetX + x, py: H - Math.random() * 20 - 10}, {x, y: H}),
                    speed,
                    radius: Math.random() + 1,
                    path: time * 0.15
                }
            )
        }

    };

    ctx.lineWidth = 2;
    let startTime: number = 0;
    const render = (timeStamp = 0): void => {
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        for (let i = 0, l = store.length; i < l; i++) {
            const storeCase: rainType = store[i];
            if (!storeCase) continue;
            ctx.beginPath();
            if (storeCase.pos.y > H) {
                store.splice(i, 1);
                continue;
            }
            ctx.moveTo(storeCase.pos.x, storeCase.pos.y);


            let offsetX = offsetAngle * storeCase.height * leftOrRight;

            ctx.lineTo(storeCase.pos.x + offsetX, storeCase.pos.y + storeCase.height);
            storeCase.pos.y += storeCase.speed;
            storeCase.pos.x += storeCase.speed * offsetAngle * leftOrRight;
            ctx.stroke();

            if (storeCase.pos.y + storeCase.height > H && !storeCase.drops) {
                addDrops(storeCase.pos.x + offsetX, storeCase.height / storeCase.speed);
                storeCase.drops = true;
            }


        }

        for (let i = 0, l = dropsStore.length; i < l; i++) {
            const drop: dropsType = dropsStore[i];
            if (!drop) continue;
            ctx.beginPath();

            if (drop.pos.y > H) {
                dropsStore.splice(i, 1);
                continue;
            }
            ctx.fillStyle = "#6EACEC";
            ctx.arc(drop.pos.x, drop.pos.y, drop.radius, 0, 2 * Math.PI);
            ctx.fill();
            if (Math.abs(drop.speed) < 1 && drop.path < 0) {
                drop.speed *= 10;
                drop.path = 0;
            } else {
                drop.path -= Math.abs(drop.speed);
            }
            drop.pos.x += drop.speed;
            drop.pos.y = drop.fn(drop.pos.x);


        }
        if (timeStamp - startTime > rainFrequency) {
            store.push(
                {
                    pos: {
                        x: Math.random() * W,
                        y: 0
                    },//坐标
                    height: 30 * Math.random() + 20,//长度
                    drops: false,
                    speed: Math.random() * 2 + H / 40
                },
            )
            startTime = timeStamp;
        }

        window.requestAnimationFrame(render);
    };
    render();
    canvas.addEventListener('mousemove', (ev) => {
        const offsetX = ev.offsetX;

        const distance = Math.abs(offsetX - halfWidth);

        leftOrRight = offsetX - halfWidth > 0 ? 1 : -1;

        offsetAngle = distance / H;

    })
})()