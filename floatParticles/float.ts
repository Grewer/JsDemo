const canvas = <HTMLCanvasElement>document.getElementById('canvas');
let ctx: any = canvas.getContext('2d');
const W: number = canvas.width = window.innerWidth;
const H: number = canvas.height = window.innerHeight;

ctx.fillStyle = "#fff";

const mFound: number = H * 2.5;
const mStr: number = H * 1.5;

const str: string = '404';
ctx.textBaseline = 'bottom';
ctx.font = `${H / 2}px  'Arial', sans-serif`;
const strWidth: number = ctx.measureText(str).width;
ctx.fillText(str, (W - strWidth) / 2, (H + H / 4) / 2, W / 2);

const found: string = 'Not Found';
ctx.textBaseline = 'top';
ctx.font = `${H / 6}px  'Arial', sans-serif`;
const foundWidth: number = ctx.measureText(found).width;
ctx.fillText(found, (W - foundWidth) / 2, (H + H / 4) / 2, W / 2);

let imageDataStr = ctx.getImageData(0, 0, W, (H + H / 4) / 2);
let imageDataFound = ctx.getImageData(0, (H + H / 4) / 2, W, (H - H / 4) / 2);

interface dotsType {
    x: number
    y: number
    r: number
    a: number
    lx: number
    rx: number
    v: number
}

function getDots(imageData, isStr: boolean): dotsType[] {
    let dots = [];
    let index: number = 0;
    for (let i = 0; i < W; i += 2) {
        for (let j = 0; j < H; j += 2) {
            let k = 4 * (i + j * W);
            if (imageData.data[k] > 0) {
                dots[index++] = {
                    x: i,
                    y: isStr ? j : j + (H + H / 4) / 2,
                    r: Math.random() * (isStr ? 8 : 3),
                    a: Math.random(),
                    lx: isStr ? i - 4 : i - 2,
                    rx: isStr ? i + 4 : i + 2,
                    v: (Math.random() - .5) * .3
                }
            }
        }
    }
    let newDots = [];
    const m = isStr ? mStr : mFound;
    if (m && (dots.length > m)) {
        for (let i = 0; i < m; i++) {
            newDots.push(dots[Math.floor(Math.random() * dots.length)]);
        }
    } else {
        newDots = dots;
    }
    return newDots;
}

let dataStr:dotsType[] = getDots(imageDataStr, true);
let DataFound:dotsType[] = getDots(imageDataFound, false);


const data:dotsType[] = [...dataStr, ...DataFound];

function render(): void {

    ctx.fillStyle = "#4db9ea";
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${temp.a})`;

        temp.x = temp.x + temp.v;
        temp.y = temp.y + temp.v;
        if (temp.x < temp.lx || temp.x > temp.rx) {
            temp.v = -temp.v;
        }
        ctx.arc(temp.x, temp.y, temp.r, 0, 2 * Math.PI);
        ctx.fill()
    }

}


const requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame;

let startTime = 0;

function animation(time: number = 0): void {
    if (time - startTime > 25) {
        render();
        startTime = time;
    }
    requestAnimFrame(animation)
};

animation();

