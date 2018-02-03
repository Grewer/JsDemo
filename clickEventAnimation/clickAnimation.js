var canvas = document.getElementById('clickCanvas');
var ctx = canvas.getContext('2d');
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;
var store = [];
ctx.strokeStyle = '#5c96dd';
function render() {
    var i = store.length;
    ctx.clearRect(0, 0, W, H);
    while (i--) {
        ctx.beginPath();
        ctx.arc(store[i].x, store[i].y, store[i].r, 0, 2 * Math.PI);
        ctx.stroke();
        store[i].r += 2;
        if (store[i].r === 8 && store[i].times === 0) {
            store[i].times++;
            store.push({
                x: store[i].x,
                y: store[i].y,
                r: 0,
                times: 1
            });
        }
        if (store[i].r > 20) {
            store.splice(i, 1);
        }
    }
}
var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
var startTime = 0;
function animation(timeStamp) {
    if (timeStamp === void 0) { timeStamp = 0; }
    if (timeStamp - startTime > 30) {
        render();
        startTime = timeStamp;
    }
    rAF(animation);
}
;
animation();
document.addEventListener('click', function (ev) {
    var xp = ev.clientX - canvas.offsetLeft;
    var yp = ev.clientY - canvas.offsetTop;
    store.push({
        x: xp,
        y: yp,
        r: 0,
        times: 0
    });
}, false);
document.addEventListener('mousemove', function (ev) {
    var xp = ev.clientX - canvas.offsetLeft;
    var yp = ev.clientY - canvas.offsetTop;
    store.push({
        x: xp,
        y: yp,
        r: 0,
        times: 1
    });
}, false);
//# sourceMappingURL=clickAnimation.js.map