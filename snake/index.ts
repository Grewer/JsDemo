const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx: any = canvas.getContext('2d');

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
    // 待完善根据最后2个节点确定位置
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

const abs = (num:number): number => {
    return Math.abs(num)
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

    if (!checkIsFail()) return alert('fail') // 检测是否失败


    // TODO 渲染思路:  首先判断方向 若为左或右 则先判断和上一个对象纵坐标是否相等,若相等,则像左或右运动,若不相等,则横坐标相减,纵向运动

    // 转弯思路1 根据两点之间组成三角形,根据边长选择 x,y +1  //需要解决 x=y 是当前点在前一点中心时,继续向原来位置前进的 问题

    // 转弯思路2 当前点 x,y 某一点不等于上一点的x, y 时 记录上一点的 x,y 值,让其继续接近该点

    // 慢速转弯正常
    // 频繁转弯时出现问题 后面的身体跟不上


    for (let i = 0, l = store.length; i < l; i++) {
        const cur = store[i]
        if (i !== 0) {
            // if (cur.y === store[i - 1].y) {
            //     if (cur.x < store[i - 1].x) {
            //         store[i].x += 1
            //     } else {
            //         store[i].x -= 1
            //     }
            // }
            // if (cur.x === store[i - 1].x) {
            //     if (cur.y > store[i - 1].y) {
            //         store[i].y -= 1
            //     } else {
            //         store[i].y += 1
            //     }
            // }
            //x 和 y 相等时 是直行
            // 转弯时的状态 待解决
            //
            if (curDirection === 'left' || curDirection === 'right') {
                if (cur.y === store[i - 1].y) {
                    if (cur.x < store[i - 1].x) {
                        store[i].x += 1
                    } else {
                        store[i].x -= 1
                    }
                }else if(cur.x === store[i - 1].x){
                    if (cur.y > store[i - 1].y) {
                        store[i].y -= 1
                    } else {
                        store[i].y += 1
                    }
                } else {

                    // 记录一整个点
                    // 向该点趋近
                    // 必须 ? 完全等于该点时,取消该点 ?

                    // if(cur.prevY){
                    //     if(cur.y<cur.prevY){
                    //         cur.y++
                    //     }else{
                    //         cur.y--
                    //     }
                    //     if(cur.y === store[i-1].y){
                    //         cur.prevY = undefined
                    //     }
                    // }else{
                    //     cur.prevY =  store[i-1].y
                    //     if(cur.y<store[i-1].y){
                    //         cur.y++
                    //     }else{
                    //         cur.y--
                    //     }
                    // }

                }
            } else {
                if (cur.x === store[i - 1].x) {
                    if (cur.y > store[i - 1].y) {
                        store[i].y -= 1
                    } else {
                        store[i].y += 1
                    }
                } else if(cur.y === store[i - 1].y){
                    if (cur.x < store[i - 1].x) {
                        store[i].x += 1
                    } else {
                        store[i].x -= 1
                    }
                }else{
                    if(cur.prevX){
                        if(cur.prevX<cur.x){
                            cur.x--
                        }else{
                            cur.x++
                        }
                        if(cur.x === store[i-1].x){
                            cur.prevX = undefined
                        }
                    }else{
                        cur.prevX =  store[i-1].x
                        if(cur.x<store[i-1].x){
                            cur.x++
                        }else{
                            cur.x--
                        }
                    }

                }
            }
            // todo 转弯2次后的问题

        }
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
            if (curDirection !== 'left') {
                curDirection = 'right';
            }
            break;
        case 37:
            if (curDirection !== 'right') {
                curDirection = 'left';
            }
            break;
        case 38:
            if (curDirection !== 'down') {
                curDirection = 'up';
            }
            break;
        case 40:
            if (curDirection !== 'up') {
                curDirection = 'down';
            }
            break;
    }
})