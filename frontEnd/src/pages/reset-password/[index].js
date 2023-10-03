import { Col, Form, InputGroup } from "react-bootstrap";
import logoimg from '../../assets/images/logo_icon.svg';
import { useState } from "react";
import { useRouter } from "next/router";
import { ResetPasswordAPi } from "../api/axiosRequest";
import Link from "next/link";
import Image from "next/image";
import LoadingPage from "@/components/common/loadingPage";
import { toast } from "react-toastify";
import Head from "next/head";
const ResetPassword = () => {

    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [PasswordError, setPasswordError] = useState('');
    const [confirmpasswordError, setConfirmPasswordError] = useState('');
    const [AllData, setAlldata] = useState({
        password: '',
        confirm_password: '',
    })
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    const keyword = router.query;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            password: AllData.password,
            confirmpassword: AllData.confirm_password
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
                const resp = await ResetPasswordAPi(data, keyword.index);
                router.push("/login");
                toast.success(resp.data.message);
                setIsLoading(false);
                setPasswordError("");
                setConfirmPasswordError('');
            } catch (error) {
                setIsLoading(false);
                setPasswordError(error?.response?.data.error?.errors?.password?.message);
                setConfirmPasswordError(error?.response?.data.error?.errors?.confirmpassword?.message);
                setConfirmPasswordError(error?.response?.data.message);
            }
        }
    }
    return (
        <>
            <Head>
                <title>Reset Password | Limitless</title>
            </Head>
            <Form onSubmit={handleSubmit} noValidate validated={validated} className='login-form'>
                {isLoading ? <LoadingPage /> : null}
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="text-center mb-3">
                            <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                                <Image src={logoimg} width={0} height={0} className="h-48px loginlogo" alt="img" />
                            </div>
                            <h5 className="mb-0">Password recovery</h5>
                            <span className="d-block text-muted">Reset your password</span>
                        </div>
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

                        <div className="form-group mb-3">
                            <button className="btn btn-primary w-100" type="submit" title="Sign in">Reset password<i className="icon-circle-right2 ml-2"></i><div className="legitRipple-ripple" ></div></button>
                        </div>
                        <div className="mt-3 text-center text-muted content-divider mb-2">
                            <span className="px-2">Back to <Link href="/login">Login</Link></span>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}
export default ResetPassword;