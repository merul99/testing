import React from "react";
import { Modal } from 'react-bootstrap'

const DialogBox = (props) => {
    const {
        handleToggle,
        isModelOpen,
        title,
        children,
    } = props;

    return (
        <Modal show={isModelOpen} onHide={handleToggle} >
            <Modal.Header closeButton>
                {title && <h5 className="modal-title mt-0" id="myModalLabel">
                    {title}
                </h5>}
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default DialogBox;
