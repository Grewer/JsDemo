
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
