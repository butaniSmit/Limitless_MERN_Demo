import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import { ModalPopup, ModalButton } from '../common/modal';
import { PostApiDetails } from '../../pages/api/axiosRequest';
import LoadingPage from '../common/loadingPage';

function Add({ reloadData }) {
    const [NameError, setNameError] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [AllData, setAlldata] = useState({
        name: '',
        description: '',
    })
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            const data = {
                role: AllData.name,
                description: AllData.description,
            }
            setLoading(true)
            try {
                const resp = await PostApiDetails(data, "roles")
                setNameError('');
                setAlldata('');
                setValidated(false);
                reloadData();
                handleClose();
                setLoading(false);
                toast.success(resp.data.message);
            } catch (error) {
                setLoading(false);
                setNameError(error?.response?.data.error.errors?.role?.message);
            }
        }
    };
    return (
        <>
            <div className="list-icons">
                <button className="btn btn-primary btn-labeled btn-labeled-start role-add" type="button" onClick={handleShow}><span className="btn-labeled-icon bg-black bg-opacity-20">
                    <i className="ph ph-plus" />
                </span>Add Role</button>
                {/* <button type="button" className="btn btn-secondary buttons-collection role-add" title="Add role" onClick={handleShow}><i className="ph ph-plus me-1"></i> Add Role</button> */}
            </div>
            <ModalPopup title="Add Role" show={show} handleClose={() => { { setShow(false); setValidated(false); setNameError(''); } }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {loading ? <LoadingPage /> : null}
                    <div className='mb-3'>
                        <Row>
                            <Col className="rowcol">
                                <Form.Group className="">
                                    <Form.Label>Name<span className="text-danger"> * </span></Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name"
                                        value={AllData.name}
                                        onChange={handleAllChange}
                                        placeholder="First Name"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <div className="form-text text-danger">
                                            <i className="ph-x-circle me-1"></i>
                                            Please enter role name.
                                        </div>
                                    </Form.Control.Feedback>
                                    {NameError &&
                                        <div className="form-text text-danger">
                                            <i className="ph-x-circle me-1"></i>
                                            {NameError}
                                        </div>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className='mb-3'>
                        <Row>
                            <Col className="rowcol">
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        name="description"
                                        value={AllData.description}
                                        onChange={handleAllChange}
                                        placeholder="Enter Description"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <ModalButton handleClose={() => { { setShow(false); setValidated(false); setNameError('') } }} />
                </Form>
            </ModalPopup>
        </>
    )
}
export default Add