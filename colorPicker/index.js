var pick = document.getElementById('pickBox');
var colorElement = pick.querySelector('.color');
var chooseColor = document.getElementById('chooseColor');
var colorPoint = pick.querySelector('.point');
//color长宽
var colorWidth = colorElement.clientWidth;
var colorHeight = colorElement.clientHeight;
console.log(colorWidth, colorHeight);
var isMoveColor = false;
var changeColor = function (ev) {
    var _a = getRGB(colorElement.style.backgroundColor), r = _a.r, g = _a.g, b = _a.b;
    //右上 RGB;
    var x = ev.offsetX, y = ev.offsetY;
    colorPoint.style.left = x + 'px';
    colorPoint.style.top = y + 'px';
    var difference = {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b
    };
    var rankX = x / colorWidth;
    rankChange(difference, rankX);
    var result = {
        r: 255 - difference.r,
        g: 255 - difference.g,
        b: 255 - difference.b
    };
    var rankY = y / colorHeight;
    rankChange(result, 1 - rankY);
    chooseColor.style.backgroundColor = objToRGB(result);
};
var rankChange = function (diff, rank) {
    for (var i in diff) {
        diff[i] = (rank * diff[i]) | 0;
    }
};
var objToRGB = function (obj) {
    return "rgb(" + obj.r + "," + obj.g + "," + obj.g + ")"; //后续加入透明度;
};
var getRGB = function (rgbString) {
    var array = rgbString.split(',');
    return { r: Number(array[0].split('(')[1]), g: Number(array[1]), b: Number(array[2].slice(0, -1)) };
};
pick.addEventListener('mousedown', function (ev) {
    var target = ev.target;
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
document.addEventListener('mousemove', function (ev) {
    if (isMoveColor === true) {
        var target = ev.target;
        if (target.className !== 'p' && target.className !== 'point') {
            var x = ev.offsetX, y = ev.offsetY;
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
            changeColor(ev); //TODO 在选择颜色区域外有错误情况
            colorPoint.style.left = x + 'px';
            colorPoint.style.top = y + 'px';
            return false;
        }
    }
}, false);
document.addEventListener('mouseup', function () {
    isMoveColor = false;
}, false);
//# sourceMappingURL=index.js.map