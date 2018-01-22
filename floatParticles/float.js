var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;
ctx.fillStyle = "#fff";
var mFound = H * 2.5;
var mStr = H * 1.5;
var str = '404';
ctx.textBaseline = 'bottom';
ctx.font = H / 2 + "px  'Arial', sans-serif";
var strWidth = ctx.measureText(str).width;
ctx.fillText(str, (W - strWidth) / 2, (H + H / 4) / 2, W / 2);
var found = 'Not Found';
ctx.textBaseline = 'top';
ctx.font = H / 6 + "px  'Arial', sans-serif";
var foundWidth = ctx.measureText(found).width;
ctx.fillText(found, (W - foundWidth) / 2, (H + H / 4) / 2, W / 2);
var imageDataStr = ctx.getImageData(0, 0, W, (H + H / 4) / 2);
var imageDataFound = ctx.getImageData(0, (H + H / 4) / 2, W, (H - H / 4) / 2);
function getDots(imageData, isStr) {
    var dots = [];
    var index = 0;
    for (var i = 0; i < W; i += 2) {
        for (var j = 0; j < H; j += 2) {
            var k = 4 * (i + j * W);
            if (imageData.data[k] > 0) {
                dots[index++] = {
                    x: i,
                    y: isStr ? j : j + (H + H / 4) / 2,
                    r: Math.random() * (isStr ? 8 : 3),
                    a: Math.random(),
                    lx: isStr ? i - 4 : i - 2,
                    rx: isStr ? i + 4 : i + 2,
                    v: (Math.random() - .5) * .3
                };
            }
        }
    }
    var newDots = [];
    var m = isStr ? mStr : mFound;
    if (m && (dots.length > m)) {
        for (var i = 0; i < m; i++) {
            newDots.push(dots[Math.floor(Math.random() * dots.length)]);
        }
    }
    else {
        newDots = dots;
    }
    return newDots;
}
var dataStr = getDots(imageDataStr, true);
var DataFound = getDots(imageDataFound, false);
var data = dataStr.concat(DataFound);
function render() {
    ctx.fillStyle = "#4db9ea";
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255," + temp.a + ")";
        temp.x = temp.x + temp.v;
        temp.y = temp.y + temp.v;
        if (temp.x < temp.lx || temp.x > temp.rx) {
            temp.v = -temp.v;
        }
        ctx.arc(temp.x, temp.y, temp.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}
var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame;
var startTime = 0;
function animation(time) {
    if (time === void 0) { time = 0; }
    if (time - startTime > 25) {
        render();
        startTime = time;
    }
    requestAnimFrame(animation);
}
;
animation();
//# sourceMappingURL=float.js.map