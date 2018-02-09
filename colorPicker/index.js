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
        // console.log(ev);
        var x = ev.offsetX, y = ev.offsetY;
        var color = { r: 255, g: 255, b: 255 }, r = color.r, g = color.g, b = color.b;
        // 先根据x改变
        // console.log((1-x/colorWidth) * 255|0) //r
        // console.log((1-x/colorWidth) * 127.5|0) //rb
        console.log((1 - y / colorHeight) * 255 | 0); //r,g,b
    }
}, false);
//# sourceMappingURL=index.js.map