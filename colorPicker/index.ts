const pick = <HTMLElement>document.getElementById('pickBox');
const colorElement = <HTMLElement>pick.querySelector('.color');
const chooseColor = <HTMLElement>document.getElementById('chooseColor');
const colorPoint = <HTMLElement>pick.querySelector('.point');
const colorBar = <HTMLElement>pick.querySelector('.colorBar');
const rgbaText = <HTMLInputElement>pick.querySelector('.rgbaText');
const colorBarThumb = <HTMLElement>pick.querySelector('.bar.thumb');
const transparency = <HTMLElement>pick.querySelector('.transparency');
const transparencyBar = <HTMLElement>pick.querySelector('.transparencyBar');
const transparencyThumb = <HTMLElement>pick.querySelector('.transparency .thumb');


//color长宽
const colorWidth: number = colorElement.clientWidth;
const colorHeight: number = colorElement.clientHeight;
const transparencyBarWidth: number = transparencyBar.clientWidth;

//pickBox 距离浏览器的left,top;

// const getPickBoxOffsetTop = (): number => {
//     let top: number = 0;
//     const topFunc = (element = pick) => {
//         if (element.offsetParent.nodeName === 'BODY') {
//             top = element.offsetTop;
//         } else {
//             top += element.offsetTop;
//             return topFunc(<HTMLElement>element.offsetParent);
//         }
//     };
//     topFunc();
//     return top;
// };
//
// const getPickBoxOffsetLeft = (): number => {
//     let left: number = 0;
//     const leftFunc = (element = pick) => {
//         if (element.offsetParent.nodeName === 'BODY') {
//             left = element.offsetLeft;
//         } else {
//             left += element.offsetLeft;
//             return leftFunc(<HTMLElement>element.offsetParent);
//         }
//     };
//     leftFunc();
//     return left;
// };
//
// let pickBoxOffsetTop = getPickBoxOffsetTop();
//
// let pickBoxOffsetLeft = getPickBoxOffsetLeft();
//
// console.log(pickBoxOffsetTop, pickBoxOffsetLeft);

let isMoveColor: boolean = false;
let isMoveColorBar: boolean = false;
let isMoveTransparency: boolean = false;

let transparencyCache: number = 1;

const changeColor = (x: number = 0, y: number = 0): void => {
    let {r, g, b} = rgbToObj(colorElement.style.backgroundColor);
    //右上 RGB;

    const difference = {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b
    };
    const scaleX = x / colorWidth;
    scaleChange(difference, scaleX);
    const result = {
        r: 255 - difference.r,
        g: 255 - difference.g,
        b: 255 - difference.b
    };
    const scaleY = y / colorHeight;

    scaleChange(result, 1 - scaleY);
    const RGBA = objToRGBA(result);
    chooseColor.style.backgroundColor = RGBA;
    rgbaText.value = RGBA;
    transparency.style.backgroundColor = objToRGB(result);

};

interface rgb {
    r: number
    g: number
    b: number
}

interface colorBarRangeType {
    rank: number,
    arr: rgb[]
}

const scaleChange = (diff: rgb, scale: number): void => {
    for (let i in diff) {
        diff[i] = (scale * diff[i]) | 0;
    }
};
const pxToNumber = (px: string = '0px'): number => {
    return Number(px.slice(0, -2));
};

const objToRGBA = (obj: rgb): string => {
    return `rgba(${obj.r},${obj.g},${obj.b},${transparencyCache})`;
};

const objToRGB = (obj: rgb): string => {
    return `rgb(${obj.r},${obj.g},${obj.b})`;
};

const rgbToObj = (rgbString: string): rgb => {
    let array: string[] = rgbString.split(',');
    return {r: Number(array[0].split('(')[1]), g: Number(array[1]), b: Number(array[2].slice(0, -1))};
};

const colorBarRange = (scale: number): colorBarRangeType => {
    switch (true) {
        case scale < .17:
            return {rank: scale / .17, arr: [{r: 255, g: 0, b: 0}, {r: 255, g: 255, b: 0}]};
        case scale < .33:
            return {rank: (scale - .17) / .16, arr: [{r: 255, g: 255, b: 0}, {r: 0, g: 255, b: 0}]};
        case scale < .5:
            return {rank: (scale - .33) / .17, arr: [{r: 0, g: 255, b: 0}, {r: 0, g: 255, b: 255}]};
        case scale < .67:
            return {rank: (scale - .5) / .17, arr: [{r: 0, g: 255, b: 255}, {r: 0, g: 0, b: 255}]};
        case scale < .83:
            return {rank: (scale - .67) / .16, arr: [{r: 0, g: 0, b: 255}, {r: 255, g: 0, b: 255}]};
        default:
            return {rank: (scale - .83) / .17, arr: [{r: 255, g: 0, b: 255}, {r: 255, g: 0, b: 0}]};
    }
};

const getTransparency = (rank: number): number => {
    return Number((1 - rank / transparencyBarWidth).toFixed(2));
};

const changeColorBar = (scale: number) => {
    const range = colorBarRange(scale);
    let rangeArr: rgb[] = range.arr;
    let diff: rgb = {
        r: rangeArr[0].r - rangeArr[1].r,
        g: rangeArr[0].g - rangeArr[1].g,
        b: rangeArr[0].b - rangeArr[1].b
    };
    let result = rangeArr[1];
    for (let i in diff) {
        result[i] = result[i] + diff[i] * (1 - range.rank) | 0;
    }
    return result;
};

const changeTransparency = (x: number) => {
    const transparency = getTransparency(x);
    transparencyThumb.style.left = x + 'px';
    transparencyCache = transparency;

    let currentColor = rgbaText.value.split(',');
    currentColor.splice(currentColor.length - 1, 1, transparency + ')');
    const changeTransparencyColor = currentColor.join(',');

    rgbaText.value = changeTransparencyColor;
    chooseColor.style.backgroundColor = changeTransparencyColor;
};

pick.addEventListener('mousedown', (ev) => {
    const target = <HTMLElement>ev.target;
    switch (target.className) {
        case 'p':
            return isMoveColor = true;
        case 'point':
            return isMoveColor = true;
        case 'thumb bar':
            return isMoveColorBar = true;
        case 'thumb trans':
            return isMoveTransparency = true;

    }
}, false);


pick.addEventListener('click', (ev) => {
    const target = <HTMLElement>ev.target;
    const x = ev.offsetX, y = ev.offsetY;
    switch (target.className) {
        case 'colorBar':
            colorBarThumb.style.top = y + 'px';
            const result = changeColorBar(y / colorHeight);
            colorElement.style.backgroundColor = objToRGB(result);
            return changeColor(pxToNumber(colorPoint.style.left), pxToNumber(colorPoint.style.top));
        case 'black':
            colorPoint.style.left = x + 'px';
            colorPoint.style.top = y + 'px';
            return changeColor(x, y);
        case 'transparencyBar':
            return changeTransparency(x);
    }
}, false);

document.addEventListener('mousemove', (ev) => {
    const target = <HTMLElement>ev.target;
    let x = ev.offsetX, y = ev.offsetY;

    switch (true) {
        case isMoveTransparency:
            if (target.className !== 'thumb trans') {
                changeTransparency(x);
            }
            return false;
        case isMoveColorBar:
            if (target.className !== 'thumb bar') {
                switch (true) {
                    case y < 0:
                        y = 0;
                    case y > colorHeight:
                        y = colorHeight;
                }
                colorBarThumb.style.top = y + 'px';
                const result = changeColorBar(y / colorHeight);
                colorElement.style.backgroundColor = objToRGB(result);
                changeColor(pxToNumber(colorPoint.style.left), pxToNumber(colorPoint.style.top));
            }
            return false;
        case isMoveColor:
            if (target.className !== 'p' && target.className !== 'point') {
                // console.log(ev.clientY);
                switch (true) {
                    case x < 0:
                        x = 0;
                    case y < 0:
                        y = 0;
                    case x > colorWidth:
                        x = colorWidth;
                    case y > colorHeight:
                        y = colorHeight;
                }
                changeColor(x, y);
                colorPoint.style.left = x + 'px';
                colorPoint.style.top = y + 'px';
            }
            return false;

    }


}, false);

//TODO 将 click  与 mouse 分开
// colorElement.addEventListener('mouseleave', () => {
//     isMoveColor = false;
// }, false);
// colorBar.addEventListener('mouseleave', () => {
//     isMoveColorBar = false;
// }, false);

document.addEventListener('mouseup', () => {
    isMoveColor = false;
    isMoveColorBar = false;
    isMoveTransparency = false;
}, false);
