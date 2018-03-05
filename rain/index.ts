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

        const grad = ctx.createLinearGradient(0, 0, 0, H);
        /* 指定几个颜色 */
        grad.addColorStop(0, '#688896');
        grad.addColorStop(1, '#423d38');


        interface coordinateType {
            x: number
            y: number
        }

        interface rainType {
            pos: coordinateType
            height: number
            drops: boolean
        }

        let store: rainType[] = [];

        interface dropsType {
            pos: coordinateType
            fn: Function
            speed: number
            radius: number
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

        const addDrops = (x) => {
            let i = Math.random() * 10 + 2 | 0;
            while (i--) {
                const offsetX = Math.random() * 50 - 25;
                const speed = offsetX > 0 ? 2 : -2;
                dropsStore.push(
                    {
                        pos: {x, y: H},
                        fn: getParabolaFunc({px: offsetX + x, py: H - Math.random() * 40 - 10}, {x, y: H}),
                        speed,
                        radius: Math.random() + 1
                    }
                )
            }

        };

        let startTime: number = 0;
        const render = (timeStamp = 0): void => {
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            for (let i = 0, l = store.length; i < l; i++) {
                const storeCase: rainType = store[i];
                if (!storeCase) continue;
                ctx.beginPath();
                if (storeCase.pos.y > H) {
                    //报错
                    store.splice(i, 1);
                    continue;
                }
                ctx.moveTo(storeCase.pos.x, storeCase.pos.y);
                ctx.lineTo(storeCase.pos.x, storeCase.pos.y + storeCase.height);
                storeCase.pos.y += 12;
                if (storeCase.pos.y + storeCase.height > H && !storeCase.drops) {
                    addDrops(storeCase.pos.x);
                    storeCase.drops = true;
                }
                ctx.stroke();

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
                drop.pos.x += drop.speed;
                drop.pos.y = drop.fn(drop.pos.x);

            }
            if (timeStamp - startTime > 200) {
                store.push(
                    {
                        pos: {
                            x: Math.random()*W,
                            y: 0
                        },//坐标
                        height: 50*Math.random()+20,//长度
                        drops: false
                    },
                )
                startTime = timeStamp;
            }
            // console.log(timeStamp);

            window.requestAnimationFrame(render);
        };
        render();

    }

)()