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

const getPickBoxOffsetTop = (): number => {
    let top: number = 0;
    const topFunc = (element = pick) => {
        if (element.offsetParent.nodeName === 'BODY') {
            top = element.offsetTop;
        } else {
            top += element.offsetTop;
            return topFunc(<HTMLElement>element.offsetParent);
        }
    };
    topFunc();
    return top;
};

const getPickBoxOffsetLeft = (): number => {
    let left: number = 0;
    const leftFunc = (element = pick) => {
        if (element.offsetParent.nodeName === 'BODY') {
            left = element.offsetLeft;
        } else {
            left += element.offsetLeft;
            return leftFunc(<HTMLElement>element.offsetParent);
        }
    };
    leftFunc();
    return left;
};

let pickBoxOffsetTop = getPickBoxOffsetTop();

let pickBoxOffsetLeft = getPickBoxOffsetLeft();

console.log(pickBoxOffsetTop, pickBoxOffsetLeft);

let isMoveColor: boolean = false;

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

pick.addEventListener('mousedown', (ev) => {
    const target = <HTMLElement>ev.target;
    if (target.className === 'p') {
        console.log('移动坐标');
    }
    // console.log(ev);
    // console.log(ev.target)
    // console.log(ev.offsetX, ev.offsetY);
    if (target.className === 'black') {
        isMoveColor = true;
        const x = ev.offsetX, y = ev.offsetY;
        colorPoint.style.left = x + 'px';
        colorPoint.style.top = y + 'px';
        changeColor(x, y);
        return false;
    }

    if (target.className === 'colorBar') {
        // console.log(ev)
        const y = ev.offsetY;
        colorBarThumb.style.top = y + 'px';
        const scale = y / colorHeight;
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
        colorElement.style.backgroundColor = objToRGB(result);
        changeColor(pxToNumber(colorPoint.style.left), pxToNumber(colorPoint.style.top));
    }

    if (target.className === 'transparencyBar') {
        const transparency = getTransparency(ev.offsetX);
        transparencyThumb.style.left = ev.offsetX + 'px';

        transparencyCache = transparency;

        let currentColor = rgbaText.value.split(',');
        currentColor.splice(currentColor.length - 1, 1, transparency + ')');
        const changeTransparencyColor = currentColor.join(',');

        rgbaText.value = changeTransparencyColor;
        chooseColor.style.backgroundColor = changeTransparencyColor;
    }


}, false);

document.addEventListener('mousemove', (ev) => {
    if (isMoveColor === true) {
        const target = <HTMLElement>ev.target;
        if (target.className !== 'p' && target.className !== 'point') {
            let x = ev.offsetX, y = ev.offsetY;
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
            changeColor(x, y);//TODO 在选择颜色区域外有错误情况
            colorPoint.style.left = x + 'px';
            colorPoint.style.top = y + 'px';
            return false;
        }
    }
}, false);

document.addEventListener('mouseup', () => {
    isMoveColor = false;
}, false);
