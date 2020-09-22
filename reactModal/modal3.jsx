const {body} = document

function Modal(props) {
    return ReactDOM.createPortal(
        <div className="modal-container" style={{display: props.visible ? 'block' : 'none'}}>
            <div className="modal-box">
                <div className="modal-title">
                    <span>模态框</span>
                    <span className="modal-close-icon" onClick={props.close}>x</span>
                </div>
                {props.children}
            </div>
        </div>
        , body)
}
