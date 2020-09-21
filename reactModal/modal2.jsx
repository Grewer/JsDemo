function Modal(props) {
    return <div className="modal-box">
        <div className="modal-title">
            <span>模态框</span>
            <span className="modal-close-icon" onClick={props.close}>x</span>
        </div>
        {props.children}
    </div>
}
