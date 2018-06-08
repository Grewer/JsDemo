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
  console.log(pX,pY)
  position[pX][pY].radius= width * (+store[i].percent) ; //半径
  position[pX][pY].isSet = 1;

}

