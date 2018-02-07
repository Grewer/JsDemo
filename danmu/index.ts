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
    level?: number
}

let store: dataType[] = [
    {
        data: '测试,数量',
        color: '#000',
        location: W,
        speed: 15,
        dataWidth: 85.27999877929688,

    },
    {
        data: '测试,数量2',
        color: '#000',
        location: W,
        speed: 10,
        dataWidth: 97.27999877929688,
    },
    {
        data: '测试,数量12312312312312',
        color: '#000',
        location: W,
        speed: 20,
        dataWidth: 110,
    }
];
ctx.font = '20px  宋体';//根据高度分化出层次
ctx.textBaseline = 'top';//文字 base

const maxLevel: number = H / 20 / 3 | 0;
//7.3999
console.log(maxLevel);

const render = (): void => {
    ctx.clearRect(0, 0, W, H);
    let i = store.length;
    while (i--) {
        let dm = store[i];
        ctx.fillStyle = dm.color;
        if (!dm.level && dm.level !== 0) {
            addLevel(dm);//或者返回
        }
        ctx.fillText(dm.data, dm.location, dm.level * 30);
        dm.location -= dm.speed;
        if (dm.location + dm.dataWidth < 0) {
            store.splice(i, 1);
        }
    }
};

const addLevel = (dm): void => {
    let i = store.length;
    let test = [];
    while (i--) {
        let sdm = store[i];
        if (sdm.location + sdm.dataWidth > W) {
            test[sdm.level] = sdm.location + sdm.dataWidth;
        }
    }
    for (let i = 0; i < maxLevel; i++) {
        if (!test[i]) {
            dm.level = i;
            break;
        }
        //TODO 所有行都被占据的情况
    }
};

let startTime: number = 0;
const animation = (timeStamp: number = 0): void => {
    if (timeStamp - startTime > 50) {
        render();
        startTime = timeStamp;
    }
    window.requestAnimationFrame(animation);
};

animation();


const send: any = document.getElementById('send');
const msg: any = document.getElementById('msg');

send.onclick = (): void => {
    if (!msg.value) return;
    const width = ctx.measureText(msg.value).width;
    const speed = (W / width) < 10 ? 10 :W/width
    store.push({
        data: msg.value,
        color: '#000',
        location: W,
        speed,
        dataWidth: width,
    })
};
//TODO 颜色选择器
