let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let H = canvas.height = window.innerHeight;
let W = canvas.width = window.innerWidth;
ctx.fillStyle = "#53B7F6";

let clearBg = (): void => {
    ctx.fillRect(0, 0, W, H);
};

clearBg();

interface Size{
    w:number,
    h:number
}

const getSize = ():Size =>{
    const w = (Math.random()*21+21)|0;
    const h = (w*5/7)|0;
    return {w,h}
}

const renderImg = (x: number = 10, y: number = 10,w:number=42,h:number=30): void => {
    ctx.drawImage(snowImg, x, y, w, h);
};

let readStatus: boolean = false;

let snowImg: any = new Image();
snowImg.onload = (): void => {
    readStatus = true;
};

snowImg.src = 'snow.jpg';

const snowNum: number = 8;

interface snowType {
    x: number,
    y: number,
    stepX: number,
    stepY: number
}
interface snow extends snowType,Size{}
let store: snow[] = [];//存储雪花数据

const add = (): void => {
    let num: number = snowNum * Math.random() | 0;
    while (num--) {
        const {w,h}:Size = getSize();
        store.push({
            x: Math.random() * W | 0,
            y: 0,
            stepX: (Math.random() * 5 - 2) | 0,
            stepY: ((Math.random() * 8) | 0) + 2,
            w,
            h
        })
    }
};//添加数据
const check = (data: snowType): boolean => {
    return data.y >= H;
};

const render = (): void => {
    if (!readStatus) return;
    clearBg();
    let length: number = store.length;
    while (length--) {
        let {x, y, stepX, stepY,w,h}:snow = store[length];
        renderImg(x, y,w,h);
        store[length].x += stepX;
        store[length].y += stepY;
        if (check(store[length])) {
            store.splice(length, 1);
        }
    }
};

let addTime: number = 0;
let lastTime: number = 0;

const animotion = (timestamp: number = 0): void => {
    if (timestamp - lastTime > 50) {
        render();
        lastTime = timestamp;
    }
    if (timestamp - addTime > 1000) {
        add();
        addTime = timestamp;
    }
    try {
        window.requestAnimationFrame(animotion);
    } catch {
        alert('你的浏览器不支持rAF,请更新或更换浏览器')
    }
};
animotion();