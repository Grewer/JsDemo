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
var store = [];
for (var i = 0, l = store.length; i < l; i++) {
}
ctx.fillRect(100, 100, 20, 20);
//# sourceMappingURL=index.js.map