const canvas = <HTMLCanvasElement>document.getElementById('clickCanvas');
let ctx: any = canvas.getContext('2d');
const W: number = canvas.width = window.innerWidth;
const H: number = canvas.height = window.innerHeight;

interface Type{
    x:number
    y:number
    r:number
    times:number
}

let store:Type[] = [];
ctx.strokeStyle = '#5c96dd';
function render() :void{
    let i:number = store.length;
    ctx.clearRect(0, 0, W, H);
    while (i--) {
        ctx.beginPath();
        ctx.arc(store[i].x, store[i].y, store[i].r, 0, 2 * Math.PI);
        ctx.stroke();
        store[i].r+=2;
        if(store[i].r === 8&&store[i].times === 0){
            store[i].times++;
            store.push({
                x:store[i].x,
                y:store[i].y,
                r:0,
                times:1
            });
        }
        if (store[i].r > 20) {
            store.splice(i, 1)
        }
    }
}


const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

let startTime:number = 0;
function animation(timeStamp:number = 0):void {
    if(timeStamp - startTime > 30){
        render();
        startTime = timeStamp;
    }
    rAF(animation);

};

animation();



document.addEventListener('click',  (ev) => {
    const xp:number = ev.clientX - canvas.offsetLeft;
    const yp:number = ev.clientY - canvas.offsetTop;
    store.push({
        x: xp,
        y: yp,
        r: 0,
        times:0
    });
}, false);

document.addEventListener('mousemove',  (ev) => {
    const xp:number = ev.clientX - canvas.offsetLeft;
    const yp:number = ev.clientY - canvas.offsetTop;
    store.push({
        x: xp,
        y: yp,
        r: 0,
        times:1
    });
}, false);