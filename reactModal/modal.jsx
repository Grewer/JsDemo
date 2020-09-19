/**
 * 这个文件下的 公用 modal 用来显示
 * @param props
 * @return {JSX.Element}
 * @constructor
 */

function Modal(props) {
    return props.visible && <div className="modal-container">
        <div className="modal-box">
            <div className="modal-title">
                <span>模态框</span>
                <span className="modal-close-icon" onClick={props.close}>x</span>
            </div>
            {props.children}
        </div>
    </div>

}
