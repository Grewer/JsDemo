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
var store = [
    {
        data: '测试,数量',
        color: '#000',
        location: W,
        speed: 15,
        dataWidth: 85.27999877929688,
    },
    {
        data: '测试,数量2',
        color: '#000',
        location: W,
        speed: 10,
        dataWidth: 97.27999877929688,
    },
    {
        data: '测试,数量12312312312312',
        color: '#000',
        location: W,
        speed: 20,
        dataWidth: 110,
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
        if (!dm.level && dm.level !== 0) {
            addLevel(dm); //或者返回
        }
        ctx.fillText(dm.data, dm.location, dm.level * 30);
        dm.location -= dm.speed;
        if (dm.location + dm.dataWidth < 0) {
            store.splice(i, 1);
        }
    }
};
var addLevel = function (dm) {
    var i = store.length;
    var test = [];
    while (i--) {
        var sdm = store[i];
        if (sdm.location + sdm.dataWidth > W) {
            test[sdm.level] = sdm.location + sdm.dataWidth;
        }
    }
    for (var i_1 = 0; i_1 < maxLevel; i_1++) {
        if (!test[i_1]) {
            dm.level = i_1;
            break;
        }
        //TODO 所有行都被占据的情况
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
    var width = ctx.measureText(msg.value).width;
    var speed = (W / width) < 10 ? 10 : W / width;
    store.push({
        data: msg.value,
        color: '#000',
        location: W,
        speed: speed,
        dataWidth: width,
    });
};
//TODO 颜色选择器
//# sourceMappingURL=index.js.map