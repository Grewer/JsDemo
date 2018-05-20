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


interface prevType {
    x?: number
    y?: number
}

interface bodyType {
    x: number
    y: number
    prev: prevType
}

let store: bodyType[] = [{x: 180, y: 180, prev: {}}];

let curDirection = 'right';

//每段身体20px长宽 坐标为左上角


const checkIsFail = (): boolean => {
    const head: bodyType = store[0]
    //是否碰到边
    if (head.x + 20 > W) return false

    if (head.x < 0) return false

    if (head.y < 0) return false

    if (head.y + 20 > H) return false

    // 是否碰到 body
    for (let i = 3, l = store.length; i < l; i++) {
        let cur = store[i]
        if (head.x > cur.x && head.x < cur.x + 20) {
            if (head.y > cur.y && head.y < cur.y + 20) {
                return false
            }
        }
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
    // 每一秒钟生成一个点
    let x = (W - 20) * Math.random() | 0
    let y = (W - 20) * Math.random() | 0
    point = {x, y, prev: {}}
}
generate()

const addBody = () => {
    const last: bodyType = store[store.length - 1]
    // 偶尔会有重叠的bug
    if (store.length < 2) {
        switch (curDirection) {
            case 'right':
                store.push({
                    x: last.x - 20,
                    y: last.y,
                    prev: {}
                })
                break;
            case 'left':
                store.push({
                    x: last.x + 20,
                    y: last.y,
                    prev: {}
                })
                break;
            case 'up':
                store.push({
                    x: last.x,
                    y: last.y + 20,
                    prev: {}
                })
                break;
            case 'down':
                store.push({
                    x: last.x,
                    y: last.y - 20,
                    prev: {}
                })
                break;
        }
    } else {
        let prev = last.prev
        let x = last.x
        let y = last.y

        if (last.prev.x && last.prev.y) {
            prev = last.prev
        } else {
            prev = store[store.length - 2]
        }
        if (prev.x === last.x) {
            if (prev.y < last.y) {
                y = last.y + 20
            } else {
                y = last.y - 20
            }
        } else if (prev.y === last.y) {
            if (prev.x < last.x) {
                x = last.x + 20
            } else {
                x = last.x - 20
            }
        } else {

            if (last.x + 20 === prev.x) {
                x -= 20
            } else if (last.x - 20 === prev.x) {
                x += 20
            } else if (last.y + 20 === prev.y) {
                y -= 20
            } else {
                y += 20
            }
        }
        store.push({
            x,
            y,
            prev: {}
        })

    }
}

const abs = (num: number): number => {
    return Math.abs(num)
}
const render = (): boolean => {
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


    if (!checkIsFail()) return false // 检测是否失败


    // 渲染思路:  首先判断坐标 纵坐标是否相等,若相等,则像左或右运动,若不相等,则横坐标相减,纵向运动

    // 转弯思路:  当前点 x,y 某一点不等于上一点的x, y 时 记录上一点的 x,y 值,让其继续接近该点

    for (let i = 0, l = store.length; i < l; i++) {
        const cur = store[i]
        if (i !== 0) {
            if (cur.prev.y && cur.prev.x) {
                if (cur.x !== cur.prev.x) {
                    if (cur.prev.x < cur.x) {
                        cur.x--
                    } else {
                        cur.x++
                    }
                } else if (cur.y !== cur.prev.y) {
                    if (cur.y < cur.prev.y) {
                        cur.y++
                    } else {
                        cur.y--
                    }
                } else {
                    cur.prev.y = undefined
                    cur.prev.x = undefined
                    if (cur.x === store[i - 1].x) {
                        if (cur.y < store[i - 1].y) {
                            cur.y++
                        } else {
                            cur.y--
                        }
                    } else {
                        if (cur.x < store[i - 1].x) {
                            cur.x++
                        } else {
                            cur.x--
                        }
                    }

                }
            } else {
                if (cur.y === store[i - 1].y) {
                    if (cur.x < store[i - 1].x) {
                        cur.x++
                    } else {
                        cur.x--
                    }
                } else if (cur.x === store[i - 1].x) {
                    if (cur.y > store[i - 1].y) {
                        cur.y--
                    } else {
                        cur.y++
                    }
                } else {
                    cur.prev.x = store[i - 1].x
                    cur.prev.y = store[i - 1].y
                    if (abs(cur.y - store[i - 1].y) > abs(cur.x - store[i - 1].x)) {
                        if (cur.y < store[i - 1].y) {
                            cur.y++
                        } else {
                            cur.y--
                        }
                    } else {
                        if (cur.x < store[i - 1].x) {
                            cur.x++
                        } else {
                            cur.x--
                        }
                    }
                }
            }
        }
        ctx.fillRect(cur.x, cur.y, 20, 20); // body
    }


    ctx.fillRect(point.x, point.y, 20, 20); // to eat point

    if (checkIsEat()) {
        generate()
        addBody()
    }
    return true

}

let myrAF;

const animation = (timeStamp = 0): void => {
    myrAF = requestAnimationFrame(animation)

    if (!render()) {
        alert('fail')
        cancelAnimationFrame(myrAF)
    }

}


const start = (): void => {
    if (!myrAF) {
        animation()
    }
}
const reset = (): void => {
    if (myrAF) {
        cancelAnimationFrame(myrAF)
    }
    store = [{x: 180, y: 180, prev: {}}];
    animation()
}

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