import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import { GetChangePasswordDetails } from "@/pages/api/axiosRequest";
import { useRouter } from "next/router";
import CommonButton from "../common/button";
import LoadingPage from "../common/loadingPage";

const ChangePassword = () => {
    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [PasswordError, setPasswordError] = useState('');
    const [NewPasswordError, setNewPasswordError] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
    const [AllData, setAlldata] = useState({
        currentpassword: '', password: '', confirmpassword: ''
    })
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            currentpassword: AllData.currentpassword,
            password: AllData.password,
            confirmpassword: AllData.confirmpassword,
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else if (AllData.password !== AllData.confirmpassword) {
            setConfirmPasswordError("Password and confirm password do not match.");
        }
        else {
            setLoading(true);
            try {
                const resp = await GetChangePasswordDetails(data);
                router.push("/");
                setLoading(false);
                setValidated(false);
                toast.success(resp.data.message);
                setPasswordError(''); setConfirmPasswordError(''); setNewPasswordError('');
            } catch (error) {
                setLoading(false);
                setPasswordError(error?.response?.data?.message);
                setNewPasswordError(error.response.data.error.password);
                setConfirmPasswordError(error.response.data.error.confirm_password);
            }
        }
    };
    return (
        <>
            <div className="tab-pane fade show active" id="justified-right-icon-tab3">
                <div className="card profilecard">
                    <div className="card-body">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            {loading ? <LoadingPage /> : null}
                            <input id="id" name="id" type="hidden" defaultValue={1} />
                            <div className="mb-3">
                                <Row>
                                    <Col className="rowcol">
                                        <Form.Group>
                                            <Form.Label>Current Password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"
                                                name="currentpassword"
                                                value={AllData.currentpassword || ''}
                                                onChange={handleAllChange}
                                                placeholder="Enter current Password"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <div className="form-text text-danger">
                                                    <i className="ph-x-circle me-1"></i>
                                                    Please enter current password.
                                                </div>
                                            </Form.Control.Feedback>
                                            {PasswordError && <div className="form-text text-danger">
                                                <i className="ph-x-circle me-1"></i>
                                                {PasswordError}
                                            </div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="mb-3">
                                <Row>
                                    <Col className="rowcol">
                                        <Form.Group>
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"
                                                name="password"
                                                value={AllData.password || ''}
                                                onChange={handleAllChange}
                                                placeholder="Enter new Password"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <div className="form-text text-danger">
                                                    <i className="ph-x-circle me-1"></i>
                                                    Please enter new password.
                                                </div>
                                            </Form.Control.Feedback>
                                            {NewPasswordError &&
                                                <div className="form-text text-danger">
                                                    <i className="ph-x-circle me-1"></i>
                                                    {NewPasswordError}
                                                </div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="mb-3">
                                <Row>
                                    <Col className="rowcol">
                                        <Form.Group>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"
                                                name="confirmpassword"
                                                value={AllData.confirmpassword || ''}
                                                onChange={handleAllChange}
                                                placeholder="Enter Confirm Password"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <div className="form-text text-danger">
                                                    <i className="ph-x-circle me-1"></i>
                                                    Please enter confirm password.
                                                </div>
                                            </Form.Control.Feedback>
                                            {ConfirmPasswordError &&
                                                <div className="form-text text-danger">
                                                    <i className="ph-x-circle me-1"></i>
                                                    {ConfirmPasswordError}
                                                </div>
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="text-end">
                                <CommonButton link="/" />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangePassword;