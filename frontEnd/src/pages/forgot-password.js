import Link from "next/link"
import { useState } from "react";
import logoimg from '../assets/images/logo_icon.svg';
import { Col, Form, InputGroup } from "react-bootstrap"
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ForgotPasswordAPi } from "./api/axiosRequest";
import LoadingPage from "@/components/common/loadingPage";
import Head from "next/head";

const ForgotPassword = () => {
    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [EmailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    function onChangeEmail(e) {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            setEmailError("");
        } else if (regex.test(email) === false) {
            setEmailError("Enter valid email.");
        }
        else {
            setIsLoading(true);
            try {
                const resp = await ForgotPasswordAPi(data);
                router.push("/");
                toast.success(resp.data.message);
                setIsLoading(false);
                setEmailError("");
            } catch (error) {
                setIsLoading(false);
                setEmailError(error?.response.data.message);
            }
        }
    }
    return (
        <>
            <Head>
                <title>Forgot Password | Limitless</title>
            </Head>
            {/* Password recovery form */}
            <Form onSubmit={handleSubmit} noValidate validated={validated} className='login-form'>
                {isLoading ? <LoadingPage /> : null}
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="text-center mb-3">
                            <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                                <Image src={logoimg} width={0} height={0} className="h-48px loginlogo" alt="img" />
                            </div>
                            <h5 className="mb-0">Password recovery</h5>
                            <span className="d-block text-muted">We'll send you instructions in email</span>
                        </div>
                        <Form.Group as={Col} md="4" controlId="exampleForm.ControlInput1" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>Your email</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph-at text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={onChangeEmail}
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

                        <div className="form-group mb-3">
                            <button className="btn btn-primary w-100" type="submit" title="Sign in">Reset password<i className="icon-circle-right2 ml-2"></i><div className="legitRipple-ripple" ></div></button>
                        </div>
                        <div className="mt-3 text-center text-muted content-divider mb-2">
                            <span className="px-2">Back to <Link href="login">Login</Link></span>
                        </div>
                    </div>
                </div>
            </Form>
            {/* /password recovery form */}
        </>
    )
}
export default ForgotPassword