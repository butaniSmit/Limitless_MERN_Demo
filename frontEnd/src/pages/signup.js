import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Col } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingPage from "@/components/common/loadingPage";
import logoimg from '../assets/images/logo_icon.svg';
import Image from "next/image";
import { RoleGetApiDetails, SignupDetails } from "./api/axiosRequest";
import Link from "next/link";
import Head from "next/head";

const Signup = () => {
    const router = useRouter();
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('')
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [confirmpasswordError, setConfirmPasswordError] = useState('');
    const [roleData, setRoleData] = useState([]);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [AllData, setAlldata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        roleselect: '',
    })
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            first_name: AllData.first_name,
            last_name: AllData.last_name,
            email: AllData.email,
            phone_number:AllData.phone_number,
            password: AllData.password,
            confirmpassword: AllData.confirm_password,
            role: AllData.roleselect
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else if (AllData.password !== AllData.confirm_password) {
            setConfirmPasswordError("Password and confirm password do not match.");
        }
        else {
            setIsLoading(true);
            try {
                const resp = await SignupDetails(data);
                router.push("/login");
                toast.success(resp.data.message);
                setIsLoading(false);
                setAlldata('');
                setFirstNameError(''); setLastNameError(''); setEmailError(""); setPasswordError(""); confirmpasswordError('');
            } catch (error) {
                setIsLoading(false);
                setFirstNameError(error?.response?.data.error.errors?.first_name?.message);
                setLastNameError(error?.response?.data.error.errors?.last_name?.message);
                setEmailError(error?.response?.data.error.errors?.email?.message);
                setPasswordError(error?.response?.data.error.errors?.password?.message);
                setConfirmPasswordError(error?.response?.data.error.errors?.confirmpassword?.message);
            }
        }
    };

    const fetchRoleData = async () => {
        return RoleGetApiDetails()
            .then((resp) => {
                setRoleData(resp.data.roles)
            })
    }
    useEffect(() => {
        fetchRoleData();
    }, []);
    return (
        <>
            <Head>
                <title>Register | Limitless</title>
            </Head>
            <Form onSubmit={handleSubmit} noValidate validated={validated} className='login-form'>
                {isLoading ? <LoadingPage /> : null}
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="text-center mb-3">
                            <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                                <Image src={logoimg} width={0} height={0} className="h-48px loginlogo" alt="img" />
                            </div>
                            <h5 className="mb-0">Create account</h5>
                            <span className="d-block text-muted">All fields are required</span>
                        </div>
                        <div className="text-center text-muted content-divider mb-3">
                            <span className="px-2">Your credentials</span>
                        </div>

                        <Form.Group as={Col} md="4" controlId="exampleForm.ControlInput1" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>First Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph-user-circle text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    className="rounded-left login-form-control"
                                    type="text"
                                    placeholder='First Name'
                                    name="first_name"
                                    value={AllData.first_name || ''}
                                    onChange={handleAllChange}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    <div className="form-text text-danger">
                                        <i className="ph-x-circle me-1"></i>
                                        First Name is required
                                    </div>
                                </Form.Control.Feedback>
                            </InputGroup>
                            {firstNameError ? <div className="form-text text-danger">
                                <i className="ph-x-circle me-1"></i>
                                {firstNameError}
                            </div> : null}
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="exampleForm.ControlInput" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph-user-circle text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    className="rounded-left login-form-control"
                                    type="text"
                                    placeholder='Last Name'
                                    name="last_name"
                                    value={AllData.last_name || ''}
                                    onChange={handleAllChange}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    <div className="form-text text-danger">
                                        <i className="ph-x-circle me-1"></i>
                                        Last Name is required
                                    </div>
                                </Form.Control.Feedback>
                            </InputGroup>
                            {lastNameError ? <div className="form-text text-danger">
                                <i className="ph-x-circle me-1"></i>
                                {lastNameError}
                            </div> : null}
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="exampleForm.ControlInput" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph ph-phone-call text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="rounded-left login-form-control"
                                    type="number"
                                    placeholder='Phone Number'
                                    name="phone_number"
                                    value={AllData.phone_number || ''}
                                    onChange={handleAllChange}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    <div className="form-text text-danger">
                                        <i className="ph-x-circle me-1"></i>
                                        Phone Number is required
                                    </div>
                                </Form.Control.Feedback>
                            </InputGroup>
                            {lastNameError ? <div className="form-text text-danger">
                                <i className="ph-x-circle me-1"></i>
                                {lastNameError}
                            </div> : null}
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="exampleForm.ControlInputemail" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph-at text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    className="rounded-left login-form-control"
                                    type="text"
                                    placeholder='Email'
                                    name="email"
                                    value={AllData.email || ''}
                                    onChange={handleAllChange}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    <div className="form-text text-danger">
                                        <i className="ph-x-circle me-1"></i>
                                        Email is required
                                    </div>
                                </Form.Control.Feedback>
                            </InputGroup>
                            {EmailError ? <div className="form-text text-danger">
                                <i className="ph-x-circle me-1"></i>
                                {EmailError}
                            </div> : null}
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom01" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph-lock text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    className="rounded-left login-form-control"
                                    type="password"
                                    placeholder='Password'
                                    name="password"
                                    value={AllData.password || ''}
                                    onChange={handleAllChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <div className="form-text text-danger">
                                        <i className="ph-x-circle me-1"></i>
                                        password is required
                                    </div>
                                </Form.Control.Feedback>
                            </InputGroup>
                            {PasswordError ? <div className="form-text text-danger">
                                <i className="ph-x-circle me-1"></i>
                                {PasswordError}
                            </div> : null}
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph-lock text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    className="rounded-left login-form-control"
                                    type="password"
                                    placeholder='Confirm Password'
                                    name="confirm_password"
                                    value={AllData.confirm_password || ''}
                                    onChange={handleAllChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <div className="form-text text-danger">
                                        <i className="ph-x-circle me-1"></i>
                                        Confirm Password is required
                                    </div>
                                </Form.Control.Feedback>
                            </InputGroup>
                            {confirmpasswordError ? <div className="form-text text-danger">
                                <i className="ph-x-circle me-1"></i>
                                {confirmpasswordError}
                            </div> : null}
                        </Form.Group>
                        <div className="form-group">
                            <button className="btn btn-teal w-100" type="submit">Register</button>
                        </div>
                        <div className="mt-3 text-center text-muted content-divider mb-2">
                            <span className="px-2">Back to <Link href="login">Login</Link></span>
                        </div>
                    </div>
                </div>
            </Form>
            {/* /main content */}
        </>
    )
}
export default Signup;