var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
var add10 = document.getElementById('random10');
var chooseColor = document.getElementById('chooseColor');
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
    { color: '#000', data: '真测试', dataWidth: 60, location: W, speed: 15 },
    { data: '测试1号', color: '#ddd', location: W, speed: 15, dataWidth: 68.01998901367188 },
    { data: '测试1号233', color: '#333', location: W, speed: 15, dataWidth: 104.01998901367188 },
    { data: '测试1号23323', color: '#000', location: W, speed: 15, dataWidth: 128.01998901367188 },
    { data: '测试1号23323323jd', color: '#999', location: W, speed: 18, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334444', color: '#ddb974', location: W, speed: 17, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334496', color: '#D83424', location: W, speed: 16, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334444', color: '#6bcedd', location: W, speed: 15, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334497', color: '#dd4ba6', location: W, speed: 18, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334444', color: '#82dd75', location: W, speed: 15, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334423', color: '#82dd75', location: W, speed: 15, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334444', color: '#6bcedd', location: W, speed: 10, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334498', color: '#dd4ba6', location: W, speed: 15, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334444', color: '#82dd75', location: W, speed: 10, dataWidth: 188.01998901367188 },
    { data: '测试1号2332334423', color: '#82dd75', location: W, speed: 15, dataWidth: 188.01998901367188 }
];
ctx.font = '20px  宋体'; //根据高度分化出层次
ctx.textBaseline = 'top'; //文字 base
var maxLevel = H / 20 / 3 | 0;
//7.3999
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
    var levelArray = [];
    while (i--) {
        var sdm = store[i];
        if (levelArray[sdm.level]) {
            if (levelArray[sdm.level].short < sdm.location + sdm.dataWidth) {
                levelArray[sdm.level] = { speed: sdm.speed, short: sdm.location + sdm.dataWidth };
            }
        }
        else {
            levelArray[sdm.level] = { speed: sdm.speed, short: sdm.location + sdm.dataWidth };
        }
    }
    var short = W;
    var level = 0;
    var speed = 10;
    for (var i_1 = 0; i_1 < maxLevel; i_1++) {
        if (!levelArray[i_1]) {
            dm.level = i_1;
            break;
        }
        if (i_1 === 0) {
            short = levelArray[0].short;
        }
        if (levelArray[i_1].short < short) {
            short = levelArray[i_1].short;
            speed = levelArray[i_1].speed;
            level = i_1;
        }
        if (i_1 === maxLevel - 1) {
            if (dm.speed > speed) {
                dm.location = short + (short / 10) * (dm.speed - speed) + 50;
            }
            else {
                dm.location = short + 50;
            }
            if (dm.location < W)
                dm.location = W;
            dm.level = level;
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
var getColor = function () {
    var color = chooseColor.style.backgroundColor;
    return color || '#000';
};
send.onclick = function () {
    if (!msg.value)
        return;
    var width = ctx.measureText(msg.value).width;
    var speed = W / width;
    if (speed > 20)
        speed = 20;
    if (speed < 10)
        speed = 10;
    store.push({
        data: msg.value,
        color: getColor(),
        location: W,
        speed: speed,
        dataWidth: width,
    });
};
var resources = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var getOne = function () {
    var length = Math.random() * 10 | 2 + 2;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += resources[Math.random() * resources.length | 0];
    }
    return result;
};
add10.onclick = function () {
    var color = getColor();
    for (var i = 0; i < 10; i++) {
        var word = getOne();
        var width = ctx.measureText(word).width;
        var speed = W / width;
        if (speed > 20)
            speed = 20;
        if (speed < 10)
            speed = 10;
        store.push({
            data: word,
            color: color,
            location: W,
            speed: speed,
            dataWidth: width,
        });
    }
};
//颜色选择器 移动 待修复
//# sourceMappingURL=index.js.map