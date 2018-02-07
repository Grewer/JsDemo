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
canvas.height = H * .6 * ratio;
canvas.style.width = W + 'px';
canvas.style.height = H * .6 + 'px';
ctx.scale(ratio, ratio);
// ctx.measureText(data).width
var store = [
    {
        data: '测试,数量',
        color: '#000',
        location: W,
        speed: 15,
        dataWidth: 85.27999877929688,
        level: 0
    },
    {
        data: '测试,数量2',
        color: '#000',
        location: W,
        speed: 10,
        dataWidth: 97.27999877929688,
        level: 7
    }
];
ctx.font = '20px  宋体'; //根据高度分化出层次
ctx.textBaseline = 'top'; //文字 base
var maxLevel = H / 20 / 3 | 0;
//7.3999
console.log(maxLevel);
var render = function () {
    ctx.clearRect(0, 0, W, H);
    var i = store.length;
    while (i--) {
        var dm = store[i];
        ctx.fillStyle = dm.color;
        if (!dm.level) {
            //todo
        }
        ctx.fillText(dm.data, dm.location, dm.level * 30);
        dm.location -= dm.speed;
        if (dm.location + dm.dataWidth < 0) {
            store.splice(i, 1);
        }
    }
};
var startTime = 0;
var animation = function (timeStamp) {
    if (timeStamp === void 0) { timeStamp = 0; }
    if (timeStamp - startTime > 50) {
        render();
        startTime = timeStamp;
    }
    window.requestAnimationFrame(animation);
};
animation();
var send = document.getElementById('send');
var msg = document.getElementById('msg');
send.onclick = function () {
    if (!msg.value)
        return;
};
//# sourceMappingURL=index.js.map