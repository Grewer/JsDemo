const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx: any = canvas.getContext('2d');
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
canvas.height = H * .6 * ratio;
canvas.style.width = W + 'px';
canvas.style.height = H * .6 + 'px';
ctx.scale(ratio, ratio);


interface dataType {
    data: string
    color: string
    location: number
    speed: number //根据 data 长度变化
    dataWidth: number
    level:number
}

// ctx.measureText(data).width
let store: dataType[] = [
    {
        data: '测试,数量',
        color: '#000',
        location: W,
        speed: 15,
        dataWidth: 85.27999877929688,
        level:0

    },
    {
        data: '测试,数量2',
        color: '#000',
        location: W,
        speed: 10,
        dataWidth: 97.27999877929688,
        level:7
    }
];
ctx.font = '20px  宋体';//根据高度分化出层次
ctx.textBaseline = 'top';//文字 base

const maxLevel:number = H/20/3 |0;
//7.3999
console.log(maxLevel);

const render = (): void => {
    ctx.clearRect(0, 0, W, H);
    let i = store.length;
    while (i--) {
        let dm = store[i];
        ctx.fillStyle = dm.color;
        if(!dm.level){
                //todo
        }
        ctx.fillText(dm.data, dm.location, dm.level*30);
        dm.location -= dm.speed;
        if (dm.location + dm.dataWidth < 0) {
            store.splice(i, 1);
        }
    }
};


let startTime:number = 0;
const animation = (timeStamp: number = 0):void => {
    if (timeStamp - startTime > 50) {
        render();
        startTime = timeStamp;
    }
    window.requestAnimationFrame(animation);
};

animation();


const send:any = document.getElementById('send');
const msg:any = document.getElementById('msg');

send.onclick = ():void =>{
    if(!msg.value) return;

};

