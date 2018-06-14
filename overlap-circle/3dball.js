let obj = document.getElementById('print');
const width = obj.clientWidth
const height = obj.clientHeight


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
}).sort((p, n) => {
  return n.score - p.score
})

// 求出最大比例  记为100%  后续按比例 变化  最大的宽度 记为 最小边框的50%

const minL = width > height ? height : width

// 圆心位置获取方法
// 数据按从小到大排列
// 第一步:
// 第一个最大的圆 居中 ,其他圆 随机排列 排列过程中 检验 ,若圆心进入其他圆的圆内 则将数据加入第二部的数据
// 第二步:
// 在居中列上随机取一点 , 随机选择向左还是向右,向两边移动,若移动到边界仍然失败 则进入第三步
// 第三步:
// 以上边界减去半径,下边界减去半径的长方形以元素点迭代,判断是否可行,可行则确定圆心,不可行则说明图形已无法渲染
//
const maxPercent = store[0].percent
const maxRadius = .5 * minL

function getRadius(percent, isFirst) { // 直径
  return isFirst ? maxRadius : (percent / maxPercent) * maxRadius
}

// let stepTwo = []

for (let i = 0, l = store.length; i < l; i++) {

  // let radius = minL * (+store[i].percent) / 2

  let radius = getRadius(store[i].percent, i === 0) / 2 // 半径
  store[i].radius = radius
  let pX, pY
  if (i === 0) {
    pX = width / 2
    pY = height / 2
    store[0].px = pX
    store[0].py = pY
  } else {
    pX = Math.floor(Math.random() * (width - radius * 2)) + radius
    pY = Math.floor(Math.random() * (height - radius * 2)) + radius
    // 检验是否与已知圆重叠
    if (!check(pX, pY, radius, i)) {
      stepTwo(pX, pY, radius, i)
      continue;
    }
    store[i].px = pX
    store[i].py = pY
  }
}

function stepTwo(px, py, radius, i) {
  const maxWidth = width - radius
  if (px > width / 2) {
    while (px > radius) {
      px--
      if (check(px, py, radius, i)) {
        store[i].px = px
        store[i].py = py
        break
      }
    }
  } else {
    while (px < maxWidth) {
      px++
      if (check(px, py, radius, i)) {
        store[i].px = px
        store[i].py = py
        break
      }
    }
  }
  if (!store[i].px && !store[i].py) {
    stepThree(radius, i)
  }

}

function stepThree(radius, t) {
  const maxWidth = width - radius
  const maxHeight = height - radius
  for (let i = radius; i < maxWidth; i++) {
    for (let j = radius; j < maxHeight; j++) {
      if (check(i, j, radius, t)) {
        store[t].px = i
        store[t].py = j
        return;
      }
    }
  }
}

function check(px, py, radius, i) {
  for (let j = 0; j < i; j++) {
    const obj = store[j]
    if (obj.px && obj.py) {
      if (px > obj.px - obj.radius && px < obj.px + obj.radius) {
        if (py > obj.py - obj.radius && py < obj.py + obj.radius) {
          return false
        }
      }
    }
  }
  return true
}

let defs = document.querySelector('#print defs')
let docfrag = document.createDocumentFragment();
store.forEach((item, index) => {
  let mainColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)},${(Math.random() * 0.5 + 0.5).toFixed(2)})`
  createColor(index, mainColor)
  addTag(index, item.radius, item.px, item.py, item.score)
})
obj.appendChild(docfrag)

function createSvgElement(name, kv) {
  let svgEle = document.createElementNS('http://www.w3.org/2000/svg', name)
  const keys = Object.keys(kv || {})
  keys.forEach(i => {
    svgEle.setAttribute(i, kv[i])
  })
  return svgEle
}

function addTag(index, radius, x, y, value) {
  let g = createSvgElement('g', {
    'text-anchor': 'middle',
    'dominant-baseline': 'middle'
  })
  let circle = createSvgElement('circle', {
    'r': radius,
    'cx': x,
    'cy': y,
    'fill': `url(#grewer-${index})`
  })
  let text = createSvgElement('text', {
    x, y, 'fill': 'white'
  })
  let t = document.createTextNode(value)
  text.appendChild(t)
  g.appendChild(circle)
  g.appendChild(text)
  docfrag.appendChild(g)
}


function createColor(index, mainColor) {
  const radialGradient = createSvgElement('radialGradient', {
    'id': `grewer-${index}`,
    'cx': '0.7',
    'cy': '0.33',
    'r': '1',
    'fy': '0.25',
    'fx': '0.8'
  })

  const addAttr = [{
    'offset': '0%',
    'stop-color': 'rgba(255, 255, 255)'
  }, {
    'offset': '50%',
    'stop-color': mainColor
  }, {
    'offset': '100%',
    'stop-color': '#000'
  }]

  for (let i = 0; i < 3; i++) {
    let stop = createSvgElement('stop', addAttr[i])
    radialGradient.appendChild(stop)
  }
  defs.appendChild(radialGradient)
}

