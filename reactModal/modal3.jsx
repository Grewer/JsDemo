const {body} = document

function Modal(props) {
    const {children, visible, close} = props
    return ReactDOM.createPortal(
        <div className="modal-container" style={{display: visible ? 'block' : 'none'}}>
            <div className="modal-box">
                <div className="modal-title">
                    <span>模态框</span>
                    <span className="modal-close-icon" onClick={close}>x</span>
                </div>
                {children}
            </div>
        </div>
        , body)
}
