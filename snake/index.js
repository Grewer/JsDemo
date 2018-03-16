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
var store = [{ x: 200, y: 200 }];
var curDirection = 'right';
var render = function (timeStamp) {
    if (timeStamp === void 0) { timeStamp = 0; }
    ctx.clearRect(0, 0, W, H);
    // console.log(timeStamp)
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
    for (var i = 0, l = store.length; i < l; i++) {
        var cur = store[i];
        // console.log(cur)
        ctx.fillRect(cur.x, cur.y, 20, 20);
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