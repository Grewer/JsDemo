let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let H = canvas.height = window.innerHeight;
let W = canvas.width = window.innerWidth;
ctx.fillStyle = "#53B7F6";
let clearBg = (): void => {
    ctx.fillRect(0, 0, W, H);
};

clearBg();

const renderImg = (x: number = 10, y: number = 10): void => {
    ctx.drawImage(snowImg, x, y, 42, 30);
};

let readStatus:boolean = false;

let snowImg: any = new Image();
snowImg.onload = (): void => {
    readStatus = true;
    renderImg(10,-25);
};

snowImg.src = 'snow.jpg';

const snowNum: number = 10;

interface snowType {
    x: number,
    y: number,
    stepX: number,
    stepY: number
}


let store: snowType[] = [];//存储雪花数据

const add = ():void=>{
    let  num:number = snowNum*Math.random()|0;
    while (num--) {
        store.push({
            x: Math.random() * W | 0,
            y: 0,
            stepX: (Math.random() * 5 - 2) | 0,
            stepY: ((Math.random() * 8) | 0) + 2
        })
    }
};//添加数据
const check = (data:snowType):boolean=>{
    return data.y>=H;
};

const render = ():void=>{
    clearBg();
    let length:number = store.length;
    while(length--){
        let {x,y,stepX,stepY}:snowType = store[length];
        renderImg(x,y);
        store[length].x += stepX;
        store[length].y += stepY;
        if(check(store[length])){
            store.splice(length,1);
        }
    }
};

setInterval(()=>{
    render();
},100);

setInterval(()=>{
    add();
},1000);