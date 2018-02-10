const pick = <HTMLElement>document.getElementById('pickBox');
const colorElement = <HTMLElement>pick.querySelector('.color');
const chooseColor = <HTMLElement>document.getElementById('chooseColor');
const colorPoint = <HTMLElement>pick.querySelector('.point');
//color长宽
const colorWidth = colorElement.clientWidth;
const colorHeight = colorElement.clientHeight;
console.log(colorWidth, colorHeight);


let isMoveColor: boolean = false;

const changeColor = (ev):void =>{
    let {r, g, b} = getRGB(colorElement.style.backgroundColor);
    //右上 RGB;
    const x = ev.offsetX, y = ev.offsetY;
    colorPoint.style.left = x + 'px';
    colorPoint.style.top = y + 'px';
    const difference = {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b
    };
    const rankX = x / colorWidth;
    rankChange(difference, rankX);
    const result = {
        r: 255 - difference.r,
        g: 255 - difference.g,
        b: 255 - difference.b
    };
    const rankY = y / colorHeight;

    rankChange(result, 1 - rankY);
    chooseColor.style.backgroundColor = objToRGB(result);
};

interface rgb {
    r: number
    g: number
    b: number
}

const rankChange = (diff: rgb, rank: number): void => {
    for (let i in diff) {
        diff[i] = (rank * diff[i]) | 0;
    }
};

const objToRGB = (obj: rgb): string => {
    return `rgb(${obj.r},${obj.g},${obj.g})`;//后续加入透明度;
};

const getRGB = (rgbString: string): rgb => {
    let array: string[] = rgbString.split(',');
    return {r: Number(array[0].split('(')[1]), g: Number(array[1]), b: Number(array[2].slice(0, -1))};
};


pick.addEventListener('mousedown', (ev) => {
    const target = <HTMLElement>ev.target;
    if (target.className === 'p') {
        console.log('移动坐标');
    }
    console.log(ev);
    console.log(ev.offsetX, ev.offsetY);
    if (target.className === 'black') {
        isMoveColor = true;
        changeColor(ev);
        return false;
    }

}, false);

document.addEventListener('mousemove', (ev) => {
    if (isMoveColor === true) {
        const target = <HTMLElement>ev.target;
        if(target.className !== 'p' && target.className !== 'point' ){
            let x = ev.offsetX, y = ev.offsetY;
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
            changeColor(ev);//TODO 在选择颜色区域外有错误情况
            colorPoint.style.left = x + 'px';
            colorPoint.style.top = y + 'px';
            return false;
        }
    }
}, false);

document.addEventListener('mouseup', () => {
    isMoveColor = false;
}, false);
