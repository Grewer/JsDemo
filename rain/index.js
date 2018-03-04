var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
var pixelRatio = window.devicePixelRatio || 1;
var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
var ratio = pixelRatio / backingStoreRatio;
canvas.width = W * ratio;
canvas.height = H * ratio;
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';
ctx.scale(ratio, ratio);
var store = [
    {
        posi: {
            x: 200,
            y: 0
        },
        height: 70,
        drops: false
    }
];
ctx.fillStyle = "#000";
ctx.strokeStyle = "#fff";
ctx.moveTo(0, 0);
var getParabolaFunc = function (_a, _b) {
    var px = _a.px, py = _a.py;
    var _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d;
    //顶点,某一点
    var a = (y - py) / Math.pow(x - px, 2);
    var b = 2 * -px * a;
    var c = px * px * a + py;
    console.log(a, b, c);
    return function (x) {
        return a * x * x + b * x + c;
    };
};
var func;
//
var render = function () {
    // console.log('run');
    ctx.fillRect(0, 0, W, H);
    // if (!func) {
    //     func = getParabolaFunc({px: 200, py: 200}, {x, y});
    // }
    //
    // ctx.lineTo(x += 1, func(x));
    //
    // console.log(x, func(x));
    //
    for (var i = 0, l = store.length; i < l; i++) {
        ctx.beginPath();
        var storeCase = store[i];
        if (storeCase.posi.y > H) {
            store.splice(i, 1);
            continue;
        }
        ctx.moveTo(storeCase.posi.x, storeCase.posi.y);
        ctx.lineTo(storeCase.posi.x, storeCase.posi.y + storeCase.height);
        storeCase.posi.y += 12;
    }
    ctx.stroke();
    // if (x > 400) {
    //     return;
    // }
    window.requestAnimationFrame(render);
};
render();
//# sourceMappingURL=index.js.map