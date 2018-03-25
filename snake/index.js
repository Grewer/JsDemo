var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var W = 400;
var H = 400;
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
var store = [{ x: 180, y: 180 }];
var curDirection = 'right';
//每段身体20px长宽 坐标为左上角
var checkIsFail = function () {
    var head = store[0];
    //是否碰到边
    if (head.x + 20 > W)
        return false;
    if (head.x < 0)
        return false;
    if (head.y < 0)
        return false;
    if (head.y + 20 > H)
        return false;
    // TODO 是否碰到身体
    for (var i = 0, l = store.length; i < l; i++) {
    }
    return true;
};
var point;
var checkIsEat = function () {
    var head = store[0];
    if (head.x > point.x - 20 && head.x < point.x + 20) {
        if (head.y > point.y - 20 && head.y < point.y + 20) {
            return true;
        }
    }
};
var generate = function () {
    // 每大概一秒钟生成一个点
    var x = (W - 20) * Math.random() | 0;
    var y = (W - 20) * Math.random() | 0;
    point = { x: x, y: y };
};
generate();
var addBody = function () {
    var last = store[store.length - 1];
    console.log(last, store.length - 1, store[0]);
    switch (curDirection) {
        case 'right':
            store.push({
                x: last.x - 20,
                y: last.y
            });
            break;
        case 'left':
            store.push({
                x: last.x + 20,
                y: last.y
            });
            break;
        case 'up':
            store.push({
                x: last.x,
                y: last.y + 20
            });
            break;
        case 'down':
            store.push({
                x: last.x,
                y: last.y - 20
            });
            break;
    }
};
var time = 0;
var render = function (timeStamp) {
    if (timeStamp === void 0) { timeStamp = 0; }
    ctx.clearRect(0, 0, W, H);
    switch (curDirection) {
        case 'right':
            store[0].x += 1;
            break;
        case 'left':
            store[0].x -= 1;
            break;
        case 'up':
            store[0].y -= 1;
            break;
        case 'down':
            store[0].y += 1;
            break;
    }
    // TODO 速度根据长度决定
    if (JSON.stringify(point) === '{}') {
        generate();
    }
    if (!checkIsFail())
        return alert('fail');
    for (var i = 0, l = store.length; i < l; i++) {
        var cur = store[i];
        if (i !== 0) {
            switch (true) {
                case cur.x < store[i - 1].x:
                    store[i].x += 1;
                    break;
                case cur.x > store[i - 1].x:
                    store[i].x -= 1;
                    break;
                case cur.y > store[i - 1].y:
                    store[i].y -= 1;
                    break;
                case cur.y < store[i - 1].y:
                    store[i].y += 1;
                    break;
            }
        }
        // TODO 待完善
        ctx.fillRect(cur.x, cur.y, 20, 20);
    }
    ctx.fillRect(point.x, point.y, 20, 20);
    if (checkIsEat()) {
        generate();
        addBody();
    }
    requestAnimationFrame(render);
};
render();
document.addEventListener('keydown', function (ev) {
    switch (ev.keyCode) {
        case 39:
            curDirection = 'right';
            break;
        case 37:
            curDirection = 'left';
            break;
        case 38:
            curDirection = 'up';
            break;
        case 40:
            curDirection = 'down';
            break;
    }
});
//# sourceMappingURL=index.js.map