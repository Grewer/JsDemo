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


// 对入口数据做处理
const countScore = data.reduce((t, o) => {
  return t + o.score
}, 0)

const store = data.map(i => {
  i.percent = ((+i.score) / countScore).toFixed(2)
  return i
})

const minL = width > height ? height : width


for (let i = 0, l = store.length; i < l; i++) {

  // let radius = minL * (+store[i].percent) / 2
  let o = Math.random()
  o = o < 0.3 ? 0.3 : o
  let radius = minL * (o) / 2
  let pX = Math.floor(Math.random() * (width - radius))
  let pY = Math.floor(Math.random() * (height - radius))

  showResult(i,radius,radius,pX,pY)
  // TODO 两个个圆的边距考量
}

function showResult(i, elementSize, elementRadius, elementLeft, elementTop) {

  let treeElement = document.createElement("div");

  treeElement.setAttribute("id", "tree" + i);
  treeElement.style.width = elementSize + "px";
  treeElement.style.height = elementSize + "px";
  treeElement.style.borderRadius = elementRadius + "px";
  treeElement.style.left = elementLeft + "px";
  treeElement.style.top = elementTop + "px";
  treeElement.style.backgroundColor = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + "0.8)";

  obj.appendChild(treeElement);
}

