## 在 react 创建 modal

###  方案 1 普通使用

在组件中直接创建 modal 显示:
```
const {useState, useMemo} = React

const useModal = () => {
    const [visible, setVisible] = useState(false)

    return useMemo(() => {
        return {
            visible,
            show: () => {
                setVisible(true)
            },
            close: () => {
                setVisible(false)
            }
        }
    }, [visible])
}

function App() {
    const modal = useModal()

    return <>
        <button onClick={modal.show}>显示 modal
        </button>
        <Modal visible={modal.visible} close={modal.close}>qwerty</Modal>
    </>
}

ReactDOM.render(<App/>,
    document.getElementById('root')
);

```

这里我使用了 hooks 的方案来创建 modal 

modal 组件:
```

const stopPropagation = ev => ev.stopPropagation()
/**
 * 点击 x 和 mask 的时候可以关闭 modal
 * @param props
 * @return {*|JSX.Element}
 * @constructor
 */

function Modal1(props) {
    return props.visible && <div onClick={props.close} className="modal-container">
        <div className="modal-box" onClick={stopPropagation}>
            <div className="modal-title">
                <span>模态框</span>
                <span className="modal-close-icon" onClick={props.close}>x</span>
            </div>
            {props.children}
        </div>
    </div>
}
```
添加了整个 div 的 click 事件, 使得其在点击空白区域时可以触发 close 事件

使用这种方法添加 modal, 优点就是使用简单
但是需要在当前组件引用 modal, 不能缓存 modal


### 方案 2 指令式的调用

代码:
```
const {useRef} = React
const {body} = document

const show = () => {
    const Dom = document.createElement('div')
    Dom.classList.add('modal-container')
    body.appendChild(Dom)

    const close = () => {
        ReactDOM.unmountComponentAtNode(Dom)
        body.removeChild(Dom)
    }

    ReactDOM.render(<Modal close={close}/>, Dom)
}


const showV2 = () => {
    let Dom
    if (!showV2.cacheDom) {
        let _Dom = document.createElement('div')
        _Dom.classList.add('modal-container')
        body.appendChild(_Dom)
        showV2.cacheDom = _Dom
        Dom = _Dom
    } else {
        Dom = showV2.cacheDom
        Dom.style.display = 'block'
    }


    const close = () => {
        Dom.style.display = 'none'
    }

    ReactDOM.render(<Modal close={close}/>, Dom)
}

showV2.cacheDom = null

function App() {

    return <>
        <button onClick={show}>显示 modal
        </button>
        <button onClick={showV2}>显示 modal (缓存 modal)
        </button>
    </>
}

ReactDOM.render(<App/>,
    document.getElementById('root')
);
```

灵活使用 react-dom 的 api `ReactDOM.render` 和 `ReactDOM.unmountComponentAtNode`
通过 api 给 dom 挂载(解除)我们需要的组件
这样使用有 2 个主要的好处:
1. 指令式调用, 不用在 组件里引入 modal 再声明一个状态值和显示/隐藏的方法来控制他,这些冗余的操作(虽然这些东西可以通过一些方案来解决,但是依旧很麻烦)
2. 可以缓存 modal, 在第二次调用时 只需要改变 display 即可

在很多组件库里,这种写法是被经常用到的, 比如 ant-design 里的 message 和 modal(部分)

###  方案 3 使用 react 的 api 强化方案1

这里需要说到的是 react 的 api : `createPortal`

// TODO
