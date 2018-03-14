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
canvas.height = H  * ratio;
canvas.style.width = W + 'px';
canvas.style.height = H  + 'px';
ctx.scale(ratio, ratio);


let store = [];



for(let i=0,l=store.length;i<l;i++){
    console.log(store[i])
}


ctx.fillRect(100,100,20,20);