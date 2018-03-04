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


let store = [
    {
        posi:{
            x:200,
            y:0
        },//坐标
        height:70,//长度
        drops:false
    }
];


ctx.fillStyle="#000";
ctx.strokeStyle = "#fff"

ctx.moveTo(0, 0);
const getParabolaFunc = ({px, py}, {x = 0, y = 0}):Function => {
    //顶点,某一点
    const a = (y - py) / Math.pow(x - px, 2);
    const b = 2 * -px * a;
    const c = px * px * a + py;
    console.log(a, b, c);
    return (x) => {
        return a * x * x + b * x + c;
    }
};

let func;
//
const render = (): void => {
    // console.log('run');
    ctx.fillRect(0,0,W,H);

    // if (!func) {
    //     func = getParabolaFunc({px: 200, py: 200}, {x, y});
    // }
    //
    // ctx.lineTo(x += 1, func(x));
    //
    // console.log(x, func(x));
    //

    for(let i=0,l=store.length;i<l;i++){
        ctx.beginPath();
        let storeCase = store[i];
        if(storeCase.posi.y>H){
            store.splice(i,1);
            continue;
        }
        ctx.moveTo(storeCase.posi.x,storeCase.posi.y);
        ctx.lineTo(storeCase.posi.x,storeCase.posi.y+storeCase.height);
        storeCase.posi.y+=12;


    }
    ctx.stroke();


    // if (x > 400) {
    //     return;
    // }

    window.requestAnimationFrame(render);
};
render();