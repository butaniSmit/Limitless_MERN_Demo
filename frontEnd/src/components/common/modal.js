import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const ModalPopup = ({ children, title, subtitle, show, handleClose, handleDateChange }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} onClick={handleDateChange}>
                <Modal.Header className="modal-header">
                    <Modal.Title>{title} <small>{subtitle}</small></Modal.Title><i className="fa-solid fa-xmark"></i>
                    <button type="button" className="btn-close" data-dismiss="modal" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    )
}
export const ModalButton = ({ handleClose }) => {
    return (
        <>
            <div className="text-end mt-4">
                <div className="button-submit">
                    <button className="btn btn-light my-1 me-2 btn-labeled btn-labeled-start" type="button" onClick={() => { { handleClose() } }}><span className="btn-labeled-icon bg-black bg-opacity-20">
                        <i className="ph ph-x" />
                    </span>Cancel</button>

                    <button className="btn btn-primary btn-labeled btn-labeled-start" type="submit"><span className="btn-labeled-icon bg-black bg-opacity-20">
                        <i className="ph ph-folder-plus" />
                    </span>Save</button>
                </div>
            </div>
        </>
    )
}