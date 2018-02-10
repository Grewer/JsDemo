var pick = document.getElementById('pickBox');
var colorElement = pick.querySelector('.color');
//color长宽
var colorWidth = colorElement.clientWidth;
var colorHeight = colorElement.clientHeight;
console.log(colorWidth, colorHeight);
pick.addEventListener('mousedown', function (ev) {
    var target = ev.target;
    console.log(target);
    if (target.className === 'p') {
        console.log('移动坐标');
    }
    console.log(ev);
    console.log(ev.offsetX, ev.offsetY);
    if (target.className === 'black') {
        // const currentColorArea = colorElement.style.backgroundColor;
        var _a = getRGB(colorElement.style.backgroundColor), r = _a.r, g = _a.g, b = _a.b;
        //右上 RGB;
        console.log(r, g, b);
        var x = ev.offsetX, y = ev.offsetY;
        var color = { r: 255, g: 255, b: 255 };
        // {r,g,b} = color;
        //左上角白色 255,255,255;
        var difference = {
            r: 255 - r,
            g: 255 - g,
            b: 255 - b
        };
        var rankX = x / colorWidth;
        rankChange(difference, rankX);
        console.log(difference);
        var rankY = y / colorHeight;
        // 先根据x改变
        // console.log((1-x/colorWidth) * 255|0) //r
        // console.log((1-x/colorWidth) * 127.5|0) //rb
        // console.log((1-y/colorHeight)*255 |0)//r,g,b
    }
}, false);
var rankChange = function (diff, rank) {
    for (var i in diff) {
        diff[i] = (rank * diff[i]) | 0;
    }
    return diff;
};
var getRGB = function (rgbString) {
    var array = rgbString.split(',');
    return { r: Number(array[0].split('(')[1]), g: Number(array[1]), b: Number(array[2].slice(0, -1)) };
};
//# sourceMappingURL=index.js.map