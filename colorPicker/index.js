var pick, colorElement, chooseColor, colorPoint, colorBar, rgbaText, colorBarThumb, transparency, transparencyBar, transparencyThumb;
chooseColor = document.getElementById('chooseColor');
//color长宽
var colorWidth, colorHeight, transparencyBarWidth;
var pickBoxOffsetTop, pickBoxOffsetLeft;
var init = function () {
    pick = document.getElementById('pickBox');
    colorElement = pick.querySelector('.color');
    colorPoint = pick.querySelector('.point');
    colorBar = pick.querySelector('.colorBar');
    rgbaText = pick.querySelector('.rgbaText');
    colorBarThumb = pick.querySelector('.bar.thumb');
    transparency = pick.querySelector('.transparency');
    transparencyBar = pick.querySelector('.transparencyBar');
    transparencyThumb = pick.querySelector('.transparency .thumb');
    //color长宽
    colorWidth = colorElement.clientWidth;
    colorHeight = colorElement.clientHeight;
    transparencyBarWidth = transparencyBar.clientWidth;
    pickBoxOffsetTop = pick.getBoundingClientRect().top;
    pickBoxOffsetLeft = pick.getBoundingClientRect().left;
};
init();
var isMoveColor = false;
var isMoveColorBar = false;
var isMoveTransparency = false;
var transparencyCache = 1;
var changeColor = function (x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var _a = rgbToObj(colorElement.style.backgroundColor), r = _a.r, g = _a.g, b = _a.b;
    //右上 RGB;
    var difference = {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b
    };
    var scaleX = x / colorWidth;
    scaleChange(difference, scaleX);
    var result = {
        r: 255 - difference.r,
        g: 255 - difference.g,
        b: 255 - difference.b
    };
    var scaleY = y / colorHeight;
    scaleChange(result, 1 - scaleY);
    var RGBA = objToRGBA(result);
    chooseColor.style.backgroundColor = RGBA;
    rgbaText.value = RGBA;
    transparency.style.backgroundColor = objToRGB(result);
};
var scaleChange = function (diff, scale) {
    for (var i in diff) {
        diff[i] = (scale * diff[i]) | 0;
    }
};
var pxToNumber = function (px) {
    if (px === void 0) { px = '0px'; }
    return Number(px.slice(0, -2));
};
var objToRGBA = function (obj) {
    return "rgba(" + obj.r + "," + obj.g + "," + obj.b + "," + transparencyCache + ")";
};
var objToRGB = function (obj) {
    return "rgb(" + obj.r + "," + obj.g + "," + obj.b + ")";
};
var rgbToObj = function (rgbString) {
    var array = rgbString.split(',');
    return { r: Number(array[0].split('(')[1]), g: Number(array[1]), b: Number(array[2].slice(0, -1)) };
};
var colorBarRange = function (scale) {
    switch (true) {
        case scale < .17:
            return { rank: scale / .17, arr: [{ r: 255, g: 0, b: 0 }, { r: 255, g: 255, b: 0 }] };
        case scale < .33:
            return { rank: (scale - .17) / .16, arr: [{ r: 255, g: 255, b: 0 }, { r: 0, g: 255, b: 0 }] };
        case scale < .5:
            return { rank: (scale - .33) / .17, arr: [{ r: 0, g: 255, b: 0 }, { r: 0, g: 255, b: 255 }] };
        case scale < .67:
            return { rank: (scale - .5) / .17, arr: [{ r: 0, g: 255, b: 255 }, { r: 0, g: 0, b: 255 }] };
        case scale < .83:
            return { rank: (scale - .67) / .16, arr: [{ r: 0, g: 0, b: 255 }, { r: 255, g: 0, b: 255 }] };
        default:
            return { rank: (scale - .83) / .17, arr: [{ r: 255, g: 0, b: 255 }, { r: 255, g: 0, b: 0 }] };
    }
};
var getTransparency = function (rank) {
    return Number((1 - rank / transparencyBarWidth).toFixed(2));
};
var changeColorBar = function (scale) {
    var range = colorBarRange(scale);
    var rangeArr = range.arr;
    var diff = {
        r: rangeArr[0].r - rangeArr[1].r,
        g: rangeArr[0].g - rangeArr[1].g,
        b: rangeArr[0].b - rangeArr[1].b
    };
    var result = rangeArr[1];
    for (var i in diff) {
        result[i] = result[i] + diff[i] * (1 - range.rank) | 0;
    }
    return result;
};
var changeTransparency = function (x) {
    var transparency = getTransparency(x);
    transparencyThumb.style.left = x + 'px';
    transparencyCache = transparency;
    var currentColor = rgbaText.value.split(',');
    currentColor.splice(currentColor.length - 1, 1, transparency + ')');
    var changeTransparencyColor = currentColor.join(',');
    rgbaText.value = changeTransparencyColor;
    chooseColor.style.backgroundColor = changeTransparencyColor;
};
pick.addEventListener('mousedown', function (ev) {
    var target = ev.target;
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
pick.addEventListener('click', function (ev) {
    var target = ev.target;
    var x = ev.offsetX, y = ev.offsetY;
    switch (target.className) {
        case 'colorBar':
            colorBarThumb.style.top = y + 'px';
            var result = changeColorBar(y / colorHeight);
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
document.addEventListener('mousemove', function (ev) {
    var target = ev.target;
    var cx = ev.clientX + document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft, cy = ev.clientY + document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    switch (true) {
        case isMoveTransparency:
            if (target.className !== 'thumb trans') {
                var diffX = cx - pickBoxOffsetLeft - 7;
                if (diffX < 0)
                    diffX = 0;
                if (diffX > transparencyBarWidth)
                    diffX = transparencyBarWidth;
                changeTransparency(diffX);
            }
            return false;
        case isMoveColorBar:
            if (target.className !== 'thumb bar') {
                var diffY = cy - pickBoxOffsetTop - 7;
                if (diffY < 0)
                    diffY = 0;
                if (diffY > colorHeight)
                    diffY = colorHeight;
                colorBarThumb.style.top = diffY + 'px';
                var result = changeColorBar(diffY / colorHeight);
                colorElement.style.backgroundColor = objToRGB(result);
                changeColor(pxToNumber(colorPoint.style.left), pxToNumber(colorPoint.style.top));
            }
            return false;
        case isMoveColor:
            if (target.className !== 'p' && target.className !== 'point') {
                var diffX = cx - pickBoxOffsetLeft - 7, diffY = cy - pickBoxOffsetTop - 7;
                if (diffX < 0)
                    diffX = 0;
                if (diffY < 0)
                    diffY = 0;
                if (diffX > colorWidth)
                    diffX = colorWidth;
                if (diffY > colorHeight)
                    diffY = colorHeight;
                changeColor(diffX, diffY);
                colorPoint.style.left = diffX + 'px';
                colorPoint.style.top = diffY + 'px';
            }
            return false;
    }
}, false);
chooseColor.addEventListener('click', function () {
    pick.style.display = 'block';
    init();
}, false);
document.getElementById('confirm').addEventListener('click', function () {
    pick.style.display = 'none';
});
document.addEventListener('mouseup', function () {
    isMoveColor = false;
    isMoveColorBar = false;
    isMoveTransparency = false;
}, false);
//# sourceMappingURL=index.js.map