import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import Select2 from '../common/select';
import { ModalButton, ModalPopup } from '../common/modal';
import { PostApiDetails, RoleGetApiDetails } from '../../pages/api/axiosRequest';
import LoadingPage from '../common/loadingPage';

function AddAdminUsers({ reloadData }) {
  const [FirstNameError, setFirstNameError] = useState('');
  const [LastNameError, setLastNameError] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [roledata, setRoleData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
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
      phone_number: AllData.phone_number,
      password: AllData.password,
      confirmpassword: AllData.confirm_password,
      role: AllData.roleselect,
    }
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (AllData.password !== AllData.confirm_password) {
      setConfirmPasswordError("The confirm password and new password must match");
      setRoleError('');
    }
    else {
      setLoading(true)
      try {
        const resp = await PostApiDetails(data, "users");
        reloadData();
        setAlldata('');
        handleClose();
        setValidated(false);
        setLoading(false);
        toast.success(resp.data.message); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('');
      } catch (error) {
        setLoading(false);
        setFirstNameError(error?.response?.data.error.errors?.first_name?.message);
        setLastNameError(error?.response?.data.error.errors?.last_name?.message);
        setEmailError(error?.response?.data.error.errors?.email?.message);
        setPasswordError(error?.response?.data.error.errors?.password?.message);
        setConfirmPasswordError(error?.response?.data.error.errors?.confirmpassword?.message);
        setRoleError(error?.response?.data.error.errors?.role?.message);
      }
    }
  };
  const fetchRoleData = async () => {
    handleShow();
    return RoleGetApiDetails()
      .then((resp) => {
        setRoleData(resp.data.document)
      })
  }
  return (
    <>
      <button className="btn btn-primary btn-labeled btn-labeled-start" type="button" onClick={fetchRoleData}><span className="btn-labeled-icon bg-black bg-opacity-20">
        <i className="ph ph-plus" />
      </span>Add Administrator</button>
      <ModalPopup title="Add Administrator" show={show} handleClose={() => { { setShow(false); setValidated(false); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('') } }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {loading ? <LoadingPage /> : null}
          <div className='mb-3'>
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
                  {FirstNameError ?
                    <div className="form-text text-danger">
                      <i className="ph-x-circle me-1"></i>
                      {FirstNameError}
                    </div>
                    : null}
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
                  {LastNameError ?
                    <div className="form-text text-danger">
                      <i className="ph-x-circle me-1"></i>
                      {LastNameError}
                    </div>
                    : null}
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className='mb-3'>
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
                      Please enter email.
                    </div>
                  </Form.Control.Feedback>
                  {EmailError ?
                    <div className="form-text text-danger">
                      <i className="ph-x-circle me-1"></i>
                      {EmailError}
                    </div>
                    : null}
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
          <div className='mb-3'>
            <Row>
              <Col className="rowcol">
                <Form.Group>
                  <Form.Label>Password<span className="text-danger"> * </span></Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={AllData.password || ''}
                    onChange={handleAllChange}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    <div className="form-text text-danger">
                      <i className="ph-x-circle me-1"></i>
                      Please enter password.
                    </div>
                  </Form.Control.Feedback>
                  {PasswordError ?
                    <div className="form-text text-danger">
                      <i className="ph-x-circle me-1"></i>
                      {PasswordError}
                    </div>
                    : null}
                </Form.Group>
              </Col>
              <Col className="rowcol">
                <Form.Group>
                  <Form.Label>Confirm Password<span className="text-danger"> * </span></Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="confirm_password"
                    value={AllData.confirm_password || ''}
                    onChange={handleAllChange}
                    placeholder="Confirm Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    <div className="form-text text-danger">
                      <i className="ph-x-circle me-1"></i>
                      Please enter confirm password.
                    </div>
                  </Form.Control.Feedback>
                  {ConfirmPasswordError ?
                    <div className="form-text text-danger">
                      <i className="ph-x-circle me-1"></i>
                      {ConfirmPasswordError}
                    </div>
                    : null}
                </Form.Group>
              </Col>
            </Row>
          </div>
          <Row>
            <Col className="rowcol">
              <Form.Group >
                <Form.Label>Role<span className="text-danger"> * </span></Form.Label>
                <Select2 id="mySelect2"
                  required
                  className="form-control"
                  options={{ placeholder: "Select Role" }}
                  data={roledata.map((item, index) => { return ({ id: item.id, text: item.role }) })}
                  name="roleselect"
                  onChange={handleAllChange}
                  value={AllData.roleselect || ""}
                />
                <Form.Control.Feedback type="invalid">
                  <div className="form-text text-danger">
                    <i className="ph-x-circle me-1"></i>
                    Please select role.
                  </div>
                </Form.Control.Feedback>
                {roleError ?
                  <div className="form-text text-danger">
                    <i className="ph-x-circle me-1"></i>
                    {roleError}
                  </div>
                  : null}
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <ModalButton handleClose={() => { { setShow(false); setValidated(false); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('') } }} />
        </Form>
      </ModalPopup>
    </>
  )
}
export default AddAdminUsers;