import Image from 'next/image';
import logoimg from '../assets/images/logo_icon.svg';
import { Col, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { LoginDetails } from './api/axiosRequest';
import { toast } from 'react-toastify';
import LoadingPage from '@/components/common/loadingPage';
import Head from 'next/head';
const Login = () => {
    const [validated, setValidated] = useState(false);
    const router = useRouter();
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [username, setUsername] = useState('smitdb.mt@gmail.com');
    const [password, setPassword] = useState('abcd@1234');
    const [isLoading, setIsLoading] = useState(false);
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    function onChangeUsername(e) {
        setUsername(e.target.value)
    }
    function onChangePassword(e) {
        setPassword(e.target.value)
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: username,
            password: password,
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else if (regex.test(username) === false) {
            setEmailError("Enter valid email.");
        }
        else {
            setIsLoading(true);
            try {
                const resp = await LoginDetails(data);
                router.push("/");
                const expirestime = resp.data.expirestime * 1;
                Cookies.set("AuthToken", resp.data.token, { expires: expirestime });
                Cookies.set("Loginid", resp.data.user._id, { expires: expirestime });
                Cookies.set("RoleName", JSON.stringify(resp.data.user.permissions.permissions.map((items) => { return (items); })), { expires: expirestime });
                Cookies.set("RoleDetails", JSON.stringify(resp.data.user.permissions.role), { expires: expirestime });
                setEmailError(""); setPasswordError("");
                toast.success(resp.data.message);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error(error.response?.data.message);
                setEmailError(error?.response?.data.email);
                setPasswordError(error?.response?.data.password);
            }
        }
    };
    return (
        <>
            <Head>
                <title>Login | Limitless</title>
            </Head>
            <Form onSubmit={handleSubmit} noValidate validated={validated} className='login-form'>
                {isLoading ? <LoadingPage /> : null}
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="text-center mb-3">
                            <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                                <Image src={logoimg} width={0} height={0} className="h-48px loginlogo" alt="img" />
                            </div>
                            <h5 className="mb-0">Login to your account</h5>
                            <span className="d-block text-muted">Enter your credentials below</span>
                        </div>
                        <Form.Group as={Col} md="4" controlId="exampleForm.ControlInput1" className="col-12 col-lg-12 my-2 mb-3">
                            <Form.Label>Your email</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="ph-user-circle text-muted" />
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    type="text"
                                    name="email"
                                    placeholder='Email'
                                    value={username}
                                    onChange={onChangeUsername}
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
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={onChangePassword}
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
                        <div className="d-flex align-items-center mb-3">
                            <label className="form-check">
                                <input type="checkbox" name="remember" className="form-check-input" defaultChecked />
                                <span className="form-check-label">Remember</span>
                            </label>
                            <Link href="/forgot-password" className="ms-auto">Forgot password?</Link>
                        </div>
                        <div className="form-group mb-3">
                            <button className="btn btn-primary w-100" type="submit" title="Sign in">Sign in <i className="icon-circle-right2 ml-2"></i><div className="legitRipple-ripple" ></div></button>
                        </div>
                        <div className="text-center text-muted content-divider mb-3">
                            <span className="px-2">Don't have an account?</span>
                        </div>
                        <div className="mb-3">
                            <Link href="/signup" className="btn btn-light w-100">Sign up</Link>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default Login;