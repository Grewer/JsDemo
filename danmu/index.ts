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
    {color: '#000', data: '真测试', dataWidth: 60, location: W, speed: 15},
    {data: '测试1号', color: '#ddd', location: W, speed: 15, dataWidth: 68.01998901367188},
    {data: '测试1号233', color: '#333', location: W, speed: 15, dataWidth: 104.01998901367188},
    {data: '测试1号23323', color: '#000', location: W, speed: 15, dataWidth: 128.01998901367188},
    {data: '测试1号2332334444', color: '#999', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#ddb974', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#D83424', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#6bcedd', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#dd4ba6', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#82dd75', location: W, speed: 15, dataWidth: 188.01998901367188}

];
ctx.font = '20px  宋体';//根据高度分化出层次
ctx.textBaseline = 'top';//文字 base

const maxLevel: number = H / 20 / 3 | 0;
//7.3999

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
    let i: number = store.length;
    let test: number[] = [];
    while (i--) {
        let sdm = store[i];
        if (sdm.location + sdm.dataWidth > W) {
            test[sdm.level] = sdm.location + sdm.dataWidth;
        }
    }
    let short: number = W;
    let level: number = 0;
    for (let i = 0; i < maxLevel; i++) {
        if (!test[i]) {
            dm.level = i;
            break;
        }
        // console.log(test);
        if (i === 0) {
            short = test[0];
        }
        if (test[i] < short) {
            // console.log('test',test[i],i,short)
            short = test[i];
            level = i;
        }
        if (i === maxLevel - 1) {
            // console.log(short,level);
            dm.location = short + 50;//+50
            dm.level = level;
        }
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
    // const speed = (W / width) < 10 ? 10 : W / width
    const speed = 15;//暂为15
    store.push({
        data: msg.value,
        color: '#000',
        location: W,
        speed,
        dataWidth: width,
    })
};
//TODO 颜色选择器
