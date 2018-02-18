const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx: any = canvas.getContext('2d');
const W: number = window.innerWidth;
const H: number = window.innerHeight;

const add10 = document.getElementById('random10');

const chooseColor = <HTMLElement>document.getElementById('chooseColor');

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
    {data: '测试1号23323323jd', color: '#999', location: W, speed: 18, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#ddb974', location: W, speed: 17, dataWidth: 188.01998901367188},
    {data: '测试1号2332334496', color: '#D83424', location: W, speed: 16, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#6bcedd', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334497', color: '#dd4ba6', location: W, speed: 18, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#82dd75', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334423', color: '#82dd75', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#6bcedd', location: W, speed: 10, dataWidth: 188.01998901367188},
    {data: '测试1号2332334498', color: '#dd4ba6', location: W, speed: 15, dataWidth: 188.01998901367188},
    {data: '测试1号2332334444', color: '#82dd75', location: W, speed: 10, dataWidth: 188.01998901367188},
    {data: '测试1号2332334423', color: '#82dd75', location: W, speed: 15, dataWidth: 188.01998901367188}
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

interface levelArrayType {
    speed: number
    short: number
}

const addLevel = (dm): void => {
    let i: number = store.length;
    let levelArray: levelArrayType[] = [];
    while (i--) {
        let sdm = store[i];
        if(levelArray[sdm.level]){
            if(levelArray[sdm.level].short < sdm.location +sdm.dataWidth){
                levelArray[sdm.level] = { speed: sdm.speed, short: sdm.location + sdm.dataWidth};
            }
        }else{
            levelArray[sdm.level] = { speed: sdm.speed, short: sdm.location + sdm.dataWidth};
        }
    }
    let short: number = W;
    let level: number = 0;
    let speed: number = 10;
    for (let i = 0; i < maxLevel; i++) {
        if (!levelArray[i]) {
            dm.level = i;
            break;
        }
        if (i === 0) {
            short = levelArray[0].short;
        }
        if (levelArray[i].short < short) {
            short = levelArray[i].short;
            speed = levelArray[i].speed;
            level = i;
        }
        if (i === maxLevel - 1) {
            if (dm.speed > speed) {
                dm.location = short + (short / 10) * (dm.speed - speed) + 50;
            } else {
                dm.location = short + 50;
            }
            if(dm.location < W) dm.location = W;
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

const getColor = ():string=>{
    const color = chooseColor.style.backgroundColor;
    return color || '#000';
};

send.onclick = (): void => {
    if (!msg.value) return;
    const width = ctx.measureText(msg.value).width;
    let speed = W / width;
    if (speed > 20) speed = 20;
    if (speed < 10) speed = 10;

    store.push({
        data: msg.value,
        color: getColor(),
        location: W,
        speed,
        dataWidth: width,
    })
};


const resources = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const getOne = (): string => {
    const length: number = Math.random() * 10 | 2 + 2;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += resources[Math.random() * resources.length | 0];
    }

    return result;
};

add10.onclick = (): void => {
    const color = getColor();
    for (let i = 0; i < 10; i++) {
        const word = getOne();
        const width = ctx.measureText(word).width;
        let speed = W / width;
        if (speed > 20) speed = 20;
        if (speed < 10) speed = 10;
        store.push({
            data: word,
            color: color,
            location: W,
            speed,
            dataWidth: width,
        })
    }
};


//颜色选择器 移动 待修复
