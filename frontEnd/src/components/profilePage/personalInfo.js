import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { GetAccountUserDetails, GetDataAccountUser } from "@/pages/api/axiosRequest";
import { useRouter } from "next/router";
import CommonButton from "../common/button";
import LoadingPage from "../common/loadingPage";
const PersonalInfo = ({ reloadData }) => {
    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [FirstNameError, setFirstNameError] = useState('');
    const [LastNameError, setLastNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [AllData, setAlldata] = useState({
        first_name: '', last_name: '', email: '', phone_number: ''
    })
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    let Viewdata = async () => {
        setLoading(true)
        const resp = await GetAccountUserDetails();
        setAlldata(resp.data.user);
        setLoading(false)
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            first_name: AllData.first_name,
            last_name: AllData.last_name,
            email: AllData.email,
            phone_number:AllData.phone_number
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        }
        else {
            setLoading(true)
            try {
                const resp = await GetDataAccountUser(data);
                router.push("/");
                setLoading(false);
                setValidated(false);
                toast.success(resp.data.message);
                reloadData();
                setFirstNameError(''); setLastNameError(''); setEmailError('');
            } catch (error) {
                setLoading(false);
                setFirstNameError(error?.response?.data.error?.errors?.first_name?.message);
                setLastNameError(error?.response?.data.error?.errors?.last_name?.message);
                setEmailError(error?.response?.data.error?.errors?.email?.message);
            }
        }
    };
    useEffect(() => {
        Viewdata();
    }, [])
    return (
        <>
            <div className="tab-pane fade show active" id="justified-right-icon-tab1">
                <div className="tab-pane fade active show" id="profile">
                    <div className="card profilecard">
                        <div className="card-body">
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                {loading ? <LoadingPage /> : null}
                                <div className="mb-3">
                                    <Row>
                                        <Col className="rowcol">
                                            <Form.Group>
                                                <Form.Label>First Name<span className="text-danger"> * </span></Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    name="first_name"
                                                    value={AllData.first_name || ''}
                                                    onChange={handleAllChange}
                                                    placeholder="First Name"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    <div className="form-text text-danger">
                                                        <i className="ph-x-circle me-1"></i>
                                                        Please enter first name.
                                                    </div>
                                                </Form.Control.Feedback>
                                                {FirstNameError && <div className="form-text text-danger">
                                                    <i className="ph-x-circle me-1"></i>
                                                    {FirstNameError}
                                                </div>}
                                            </Form.Group>
                                        </Col>
                                        <Col className="rowcol">
                                            <Form.Group>
                                                <Form.Label>Last Name<span className="text-danger"> * </span></Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    name="last_name"
                                                    value={AllData.last_name || ''}
                                                    onChange={handleAllChange}
                                                    placeholder="Last Name"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    <div className="form-text text-danger">
                                                        <i className="ph-x-circle me-1"></i>
                                                        Please enter last name.
                                                    </div>
                                                </Form.Control.Feedback>
                                                {LastNameError &&
                                                    <div className="form-text text-danger">
                                                        <i className="ph-x-circle me-1"></i>
                                                        {LastNameError}
                                                    </div>
                                                }
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mb-3">
                                    <Row>
                                        <Col className="rowcol">
                                            <Form.Group>
                                                <Form.Label>Email<span className="text-danger"> * </span></Form.Label>
                                                <Form.Control
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={AllData.email || ''}
                                                    onChange={handleAllChange}
                                                    placeholder="Email"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    <div className="form-text text-danger">
                                                        <i className="ph-x-circle me-1"></i>
                                                        Please enter email address.
                                                    </div>
                                                </Form.Control.Feedback>
                                                {EmailError &&
                                                    <div className="form-text text-danger">
                                                        <i className="ph-x-circle me-1"></i>
                                                        {EmailError}
                                                    </div>
                                                }
                                            </Form.Group>
                                        </Col>
                                        <Col className="rowcol">
                                            <Form.Group>
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="phone_number"
                                                    value={AllData.phone_number || ''}
                                                    onChange={handleAllChange}
                                                    placeholder="Phone Number"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    <div className="form-text text-danger">
                                                        <i className="ph-x-circle me-1"></i>
                                                        Please enter Phone Number.
                                                    </div>
                                                </Form.Control.Feedback>
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
            </div>
        </>
    )
}
export default PersonalInfo;