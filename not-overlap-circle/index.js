let obj = document.getElementById('print');
const width = obj.clientWidth
const height = obj.clientHeight

console.log(width, height)

const data = [
  {
    type: '语文',
    score: 50
  },
  {
    type: '数学',
    score: 80
  },
  {
    type: '英语',
    score: 20
  },
  {
    type: '物理',
    score: 77
  },
  {
    type: '化学',
    score: 66
  },
  {
    type: '生物',
    score: 33
  }
]
// 入口数据


// 初始化布局
let position = [];
for (let i = 0; i < width; i++) {
  position[i] = [];
  for (let j = 0; j < height; j++) {
    position[i][j] = {radius: 0, isSet: 0};
  }
}


// 对入口数据做处理
const countScore = data.reduce((t, o) => {
  return t + o.score
}, 0)

const store = data.map(i => {
  i.percent = ((+i.score) / countScore).toFixed(2)
  return i
})
console.log(store)

for (let i = 0, l = store.length; i < l; i++) {
  let pX = Math.floor(Math.random() * width)
  let pY = Math.floor(Math.random() * height)
  // (width - R) * random ?
  console.log(pX, pY)
  let radius = width * (+store[i].percent) / 2
  position[pX][pY].radius = radius; //半径
  position[pX][pY].isSet = 1;
  console.log(position[pX][pY])

  let checkStartX = Math.max(pX - Math.ceil(radius) * 2, 0);
  let checkStartY = Math.max(pY - Math.ceil(radius) * 2, 0);
  let checkEndX = Math.min(pX + Math.ceil(radius) * 2, width - 1);
  let checkEndY = Math.min(pY + Math.ceil(radius) * 2, height - 1);

  for (let x = checkStartX; x <= checkEndX; x++) {
    for (let y = checkStartY; y <= checkEndY; y++) {
      if ((pX === x && pY === y) === false) {

        //比较两点间距离和两点半径和的大小 判断是否重叠                         
        const treeDistanceSquared = (pX - x) * (pX - x) + (pY - y) * (pY - y);
        const radiusSumSquared = (position[x][y].radius + radius) * (position[x][y].radius + radius);

        if (treeDistanceSquared < radiusSumSquared) {
          //发生碰撞则标记不可种植                             
          position[pX][pY].radius = 0;
          position[pY][pY].isSet = 0;
          // 后续加入
          console.log('boom')
        }

      }
    }
  }
  if (position[pX][pY].isSet === 1) {
    console.log(position[pX][pY])
    //显示结果图形
    let elementSize = position[pX][pY].radius;
    let elementRadius = position[pX][pY].radius;
    let elementLeft = pX - position[pX][pY].radius;
    let elementTop = pY - position[pX][pY].radius;

    showResult(i, elementSize, elementRadius, elementLeft, elementTop);

  }

}

function showResult(i, elementSize, elementRadius, elementLeft, elementTop) {

  var treeElement = document.createElement("div");

  treeElement.setAttribute("id", "tree" + i);
  treeElement.style.width = elementSize + "px";
  treeElement.style.height = elementSize + "px";
  treeElement.style.borderRadius = elementRadius + "px";
  treeElement.style.left = elementLeft + "px";
  treeElement.style.top = elementTop + "px";
  treeElement.style.backgroundColor = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + "0.9)";

  obj.appendChild(treeElement);
}

