const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx: any = canvas.getContext('2d');
const W: number = window.innerWidth;
const H: number = window.innerHeight;

const add10 = document.getElementById('random10');


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

interface testType {
    location: number
    speed: number
    short:number
}

const addLevel = (dm): void => {
    let i: number = store.length;
    let test: testType[] = [];
    while (i--) {
        let sdm = store[i];
        if (sdm.location + sdm.dataWidth > W) {
            // test[sdm.level] = sdm.location + sdm.dataWidth;
            test[sdm.level] = {location: sdm.location, speed: sdm.speed,short:sdm.location + sdm.dataWidth};

        }
    }
    let short: number = W;
    let level: number = 0;
    let speed: number = 10;
    for (let i = 0; i < maxLevel; i++) {
        if (!test[i]) {
            dm.level = i;
            break;
        }
        // console.log(test);
        if (i === 0) {
            console.log(short);
            short = test[0].location;
        }
        if (test[i].location < W) { //TODO 未触发的 bug
            // console.log('test',test[i],i,short)
            short = test[i].short;
            speed = test[i].speed;
            level = i;
        }
        if (i === maxLevel - 1) {
            // console.log(short,level);
            console.log(dm);
            console.log(speed,short);

            if (dm.speed > speed) {
                dm.location = short + (short / 10) * (dm.speed - speed);
            } else {
                dm.location = short + 50;
            }
            dm.level = level;
        }
    }
};
// TODO 获取 store 中 1-7 列中 每一列中最长的 对比其他列最短的那一条;  在那一条后加入;

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
    let speed = W / width;
    if (speed > 20) speed = 20;
    if (speed < 10) speed = 10;
    store.push({
        data: msg.value,
        color: '#000',
        location: W,
        speed,
        dataWidth: width,
    })
};


const resources = [1,2,3,4,5,6,7,8,9,0,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z","a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const getOne = ():string=>{
  const length:number = Math.random()*10|2 +2;
  let result = '';
  for(let i=0;i<length;i++){
      result += resources[Math.random()*resources.length|0];
  }

  return result;
};

add10.onclick = ():void =>{
    for(let i=0;i<10;i++){
        const word = getOne();
        const width = ctx.measureText(word).width;
        let speed = W / width;
        if (speed > 20) speed = 20;
        if (speed < 10) speed = 10;
        store.push({
            data: word,
            color: '#000',
            location: W,
            speed,
            dataWidth: width,
        })
    }
};


//TODO 颜色选择器待加入

// TODO 加入一个10速,靠近左边时,再加入速度20的, 会追上;
