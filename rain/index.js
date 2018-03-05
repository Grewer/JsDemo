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
    var halfWidth = W / 2;
    var offsetAngle = 0;
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    /* 指定几个颜色 */
    grad.addColorStop(0, '#688896');
    grad.addColorStop(1, '#2b2623');
    var rainFrequency = H / 6;
    var leftOrRight = 1; // -1->left  1->right
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
        var i = Math.random() * 5 + 5 | 0;
        while (i--) {
            var offsetX = Math.random() * 50 - 25;
            // TODO 添加规则:越接近0 几率越趋近50%
            //绝对值大于1 则几率等于1
            var speed = offsetX > 0 ? 1.5 : -1.5;
            dropsStore.push({
                pos: { x: x, y: H },
                fn: getParabolaFunc({ px: offsetX + x, py: H - Math.random() * 40 - 10 }, { x: x, y: H }),
                speed: speed,
                radius: Math.random() + 1
            });
        }
    };
    ctx.lineWidth = 2;
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
                store.splice(i, 1);
                continue;
            }
            ctx.moveTo(storeCase.pos.x, storeCase.pos.y);
            var offsetX = offsetAngle * storeCase.height * leftOrRight;
            ctx.lineTo(storeCase.pos.x + offsetX, storeCase.pos.y + storeCase.height);
            storeCase.pos.y += storeCase.speed;
            storeCase.pos.x += storeCase.speed * offsetAngle * leftOrRight;
            ctx.stroke();
            if (storeCase.pos.y + storeCase.height > H && !storeCase.drops) {
                addDrops(storeCase.pos.x + offsetX);
                storeCase.drops = true;
            }
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
        if (timeStamp - startTime > rainFrequency) {
            store.push({
                pos: {
                    x: Math.random() * W,
                    y: 0
                },
                height: 30 * Math.random() + 20,
                drops: false,
                speed: Math.random() * 2 + H / 40
            });
            startTime = timeStamp;
        }
        window.requestAnimationFrame(render);
    };
    render();
    canvas.addEventListener('mousemove', function (ev) {
        var offsetX = ev.offsetX;
        var distance = Math.abs(offsetX - halfWidth);
        leftOrRight = offsetX - halfWidth > 0 ? 1 : -1;
        offsetAngle = distance / H;
        console.log(offsetAngle);
    });
})();
//# sourceMappingURL=index.js.map