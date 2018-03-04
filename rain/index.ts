const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');


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
canvas.height = H * ratio;
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';

ctx.scale(ratio, ratio);

interface coordinateType {
    x: number
    y: number
}

interface rainType {
    pos: coordinateType
    height: number
    drops: boolean
}

let store: rainType[] = [
    {
        pos: {
            x: 200,
            y: 0
        },//坐标
        height: 70,//长度
        drops: false
    }
];

interface dropsType {
    pos: coordinateType
    fn: Function
    speed:number
}

let dropsStore: dropsType[] = [];


ctx.strokeStyle = "#fff";

ctx.moveTo(0, 0);
const getParabolaFunc = ({px, py}, {x = 0, y = 0}): Function => {
    //顶点,某一点
    //缓存,暂定
    const a: number = (y - py) / Math.pow(x - px, 2),
        b: number = 2 * -px * a,
        c: number = px * px * a + py;
    console.log(a, b, c);
    return (x) => {
        return a * x * x + b * x + c;
    }
};

const addDrops = (x)=>{
    let i = Math.random()*10+2|0;
    // i=1;
    while (i--){
        const offsetX =  Math.random()*50-25;
        const speed = offsetX >0 ? 2: -2;
        dropsStore.push(
            {
                pos:{x,y:H},
                fn:getParabolaFunc({px:offsetX+x,py:H-Math.random()*50},{x,y:H}),
                speed
            }
        )
    }
    console.log(dropsStore)

};


let func;
//
const render = (): void => {
    // console.log('run');
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);

    // if (!func) {
    //     func = getParabolaFunc({px: 200, py: 200}, {x, y});
    // }
    //
    // ctx.lineTo(x += 1, func(x));
    //
    // console.log(x, func(x));
    //

    for (let i = 0, l = store.length; i < l; i++) {
        ctx.beginPath();
        const storeCase: rainType = store[i];
        if (storeCase.pos.y > H) {
            store.splice(i, 1);
            continue;
        }
        ctx.moveTo(storeCase.pos.x, storeCase.pos.y);
        ctx.lineTo(storeCase.pos.x, storeCase.pos.y + storeCase.height);
        storeCase.pos.y += 12;
        if (storeCase.pos.y + storeCase.height > H && !storeCase.drops) {
            console.log('drops')
            addDrops(storeCase.pos.x);
            storeCase.drops = true;
        }

    }
    ctx.stroke();

    for(let i=0,l=dropsStore.length;i<l;i++){
        ctx.beginPath();

        const drop = dropsStore[i];
        console.log(drop);
        // if(drop.pos.y>H){
        //     delete dropsStore[i];
        //     continue;
        // }
        ctx.fillStyle = "#fff";
        ctx.arc(drop.pos.x,drop.pos.y,2,0,2*Math.PI);
        drop.pos.x+=drop.speed;
        drop.pos.y = drop.fn(drop.pos.x);
        // if(drop.pos.y>H){
        //     delete dropsStore[i];
        //     continue;
        // }
    }
    ctx.fill();




    // if (x > 400) {
    //     return;
    // }

    window.requestAnimationFrame(render);
};
render();