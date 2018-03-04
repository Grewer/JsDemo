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
        pos: {
            x: 200,
            y: 0
        },
        height: 70,
        drops: false
    }
];
var dropsStore = [];
ctx.strokeStyle = "#fff";
ctx.moveTo(0, 0);
var getParabolaFunc = function (_a, _b) {
    var px = _a.px, py = _a.py;
    var _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d;
    //顶点,某一点
    //缓存,暂定
    var a = (y - py) / Math.pow(x - px, 2), b = 2 * -px * a, c = px * px * a + py;
    console.log(a, b, c);
    return function (x) {
        return a * x * x + b * x + c;
    };
};
var addDrops = function (x) {
    var i = Math.random() * 10 + 2 | 0;
    // i=1;
    while (i--) {
        var offsetX = Math.random() * 50 - 25;
        var speed = offsetX > 0 ? 2 : -2;
        dropsStore.push({
            pos: { x: x, y: H },
            fn: getParabolaFunc({ px: offsetX + x, py: H - Math.random() * 50 }, { x: x, y: H }),
            speed: speed
        });
    }
    console.log(dropsStore);
};
var func;
//
var render = function () {
    // console.log('run');
    ctx.fillStyle = "#000";
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
        if (storeCase.pos.y > H) {
            store.splice(i, 1);
            continue;
        }
        ctx.moveTo(storeCase.pos.x, storeCase.pos.y);
        ctx.lineTo(storeCase.pos.x, storeCase.pos.y + storeCase.height);
        storeCase.pos.y += 12;
        if (storeCase.pos.y + storeCase.height > H && !storeCase.drops) {
            console.log('drops');
            addDrops(storeCase.pos.x);
            storeCase.drops = true;
        }
    }
    ctx.stroke();
    for (var i = 0, l = dropsStore.length; i < l; i++) {
        ctx.beginPath();
        var drop = dropsStore[i];
        console.log(drop);
        // if(drop.pos.y>H){
        //     delete dropsStore[i];
        //     continue;
        // }
        ctx.fillStyle = "#fff";
        ctx.arc(drop.pos.x, drop.pos.y, 2, 0, 2 * Math.PI);
        drop.pos.x += drop.speed;
        drop.pos.y = drop.fn(drop.pos.x);
        // if(drop.pos.y>H){
        //     delete dropsStore[i];
        //     continue;
        // }
    }
    ctx.fill();
    // if (x > 400) {
    //     return;
    // }
    window.requestAnimationFrame(render);
};
render();
//# sourceMappingURL=index.js.map