const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const W: number = 400;
const H: number = 400;

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

interface bodyType {
    x: number
    y: number
}

let store: bodyType[] = [{x: 180, y: 180}];

let curDirection = 'right';

//每段身体20px长宽 坐标为左上角


const checkIsFail = (): boolean => {
    const head: bodyType = store[0]
    //是否碰到边
    if (head.x + 20 > W) return false

    if (head.x < 0) return false

    if (head.y < 0) return false

    if (head.y + 20 > H) return false


    // TODO 是否碰到身体
    for (let i = 0, l = store.length; i < l; i++) {
    }
    return true
}

let point: bodyType;

const checkIsEat = () => {
    const head: bodyType = store[0]

    if (head.x > point.x - 20 && head.x < point.x + 20) {
        if (head.y > point.y - 20 && head.y < point.y + 20) {
            return true
        }
    }
}

const generate = (): void => {
    // 每大概一秒钟生成一个点
    let x = (W - 20) * Math.random() | 0
    let y = (W - 20) * Math.random() | 0
    point = {x, y}
}
generate()

const addBody = () => {
    const last: bodyType = store[store.length - 1]
    console.log(last, store.length - 1, store[0])
    switch (curDirection) {
        case 'right':
            store.push({
                x: last.x - 20,
                y: last.y
            })
            break;
        case 'left':
            store.push({
                x: last.x + 20,
                y: last.y
            })
            break;
        case 'up':
            store.push({
                x: last.x,
                y: last.y + 20
            })
            break;
        case 'down':
            store.push({
                x: last.x,
                y: last.y - 20
            })
            break;
    }
}

let time = 0;
const render = (timeStamp = 0): void => {
    ctx.clearRect(0, 0, W, H);

    switch (curDirection) {
        case 'right':
            store[0].x += 1;
            break;
        case 'left':
            store[0].x -= 1;
            break;
        case 'up':
            store[0].y -= 1;
            break;
        case 'down':
            store[0].y += 1;
            break;
    }

    // TODO 速度根据长度决定

    if (JSON.stringify(point) === '{}') {
        generate()
    }

    if (!checkIsFail()) return alert('fail')

    for (let i = 0, l = store.length; i < l; i++) {
        const cur = store[i]
        if (i !== 0) {
            switch (true) {
                case cur.x < store[i - 1].x :
                    store[i].x += 1
                    break;

                case cur.x > store[i - 1].x:
                    store[i].x -= 1
                    break;

                case cur.y > store[i - 1].y:
                    store[i].y -= 1
                    break;

                case cur.y < store[i - 1].y:
                    store[i].y += 1
                    break;
            }

        }
        // TODO 待完善
        ctx.fillRect(cur.x, cur.y, 20, 20);
    }


    ctx.fillRect(point.x, point.y, 20, 20);

    if (checkIsEat()) {
        generate()
        addBody()
    }

    requestAnimationFrame(render)
}

render()

document.addEventListener('keydown', function (ev) {
    switch (ev.keyCode) {
        case 39:
            curDirection = 'right';
            break;
        case 37:
            curDirection = 'left';
            break;
        case 38:
            curDirection = 'up';
            break;
        case 40:
            curDirection = 'down';
            break;
    }
})




