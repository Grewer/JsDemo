(function () {
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
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    /* 指定几个颜色 */
    grad.addColorStop(0, '#688896');
    grad.addColorStop(1, '#423d38');
    var store = [];
    var dropsStore = [];
    var dropsCache = {};
    ctx.strokeStyle = "#6EACEC";
    ctx.moveTo(0, 0);
    var getParabolaFunc = function (_a, _b) {
        var px = _a.px, py = _a.py;
        var _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d;
        var isExist = dropsCache[px + "-" + py + "-" + x + "-" + y];
        if (isExist) {
            return isExist;
        }
        var a = (y - py) / Math.pow(x - px, 2), b = 2 * -px * a, c = px * px * a + py;
        dropsCache[px + "-" + py + "-" + x + "-" + y] = function (x) {
            return a * x * x + b * x + c;
        };
        return dropsCache[px + "-" + py + "-" + x + "-" + y];
    };
    var addDrops = function (x) {
        var i = Math.random() * 10 + 2 | 0;
        while (i--) {
            var offsetX = Math.random() * 50 - 25;
            var speed = offsetX > 0 ? 2 : -2;
            dropsStore.push({
                pos: { x: x, y: H },
                fn: getParabolaFunc({ px: offsetX + x, py: H - Math.random() * 40 - 10 }, { x: x, y: H }),
                speed: speed,
                radius: Math.random() + 1
            });
        }
    };
    var startTime = 0;
    var render = function (timeStamp) {
        if (timeStamp === void 0) { timeStamp = 0; }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
        for (var i = 0, l = store.length; i < l; i++) {
            var storeCase = store[i];
            if (!storeCase)
                continue;
            ctx.beginPath();
            if (storeCase.pos.y > H) {
                //报错
                store.splice(i, 1);
                continue;
            }
            ctx.moveTo(storeCase.pos.x, storeCase.pos.y);
            ctx.lineTo(storeCase.pos.x, storeCase.pos.y + storeCase.height);
            storeCase.pos.y += 12;
            if (storeCase.pos.y + storeCase.height > H && !storeCase.drops) {
                addDrops(storeCase.pos.x);
                storeCase.drops = true;
            }
            ctx.stroke();
        }
        for (var i = 0, l = dropsStore.length; i < l; i++) {
            var drop = dropsStore[i];
            if (!drop)
                continue;
            ctx.beginPath();
            if (drop.pos.y > H) {
                dropsStore.splice(i, 1);
                continue;
            }
            ctx.fillStyle = "#6EACEC";
            ctx.arc(drop.pos.x, drop.pos.y, drop.radius, 0, 2 * Math.PI);
            ctx.fill();
            drop.pos.x += drop.speed;
            drop.pos.y = drop.fn(drop.pos.x);
        }
        if (timeStamp - startTime > 200) {
            store.push({
                pos: {
                    x: Math.random() * W,
                    y: 0
                },
                height: 50 * Math.random() + 20,
                drops: false
            });
            startTime = timeStamp;
        }
        // console.log(timeStamp);
        window.requestAnimationFrame(render);
    };
    render();
})();
//# sourceMappingURL=index.js.map