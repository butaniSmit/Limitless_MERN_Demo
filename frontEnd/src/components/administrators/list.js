import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import Add from "./add";
import Select2 from '../common/select';
import { ModalPopup, ModalButton } from '../common/modal';
import { DeleteApiDetails, GetDetailsById, RoleGetApiDetails, UpdateApiDetails, userApi } from "../../pages/api/axiosRequest";
import DataTable from "../common/customDataTable";
import PaginationCustom from "../pagination/pagination";
import Link from "next/link";
import LoadingPage from "../common/loadingPage";
import PermissionHelper from "../common/helper";
import Cookies from "js-cookie";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const List = () => {
    const [roledata, setRoleData] = useState([]);
    const [administrator, setAdministrator] = useState([]);
    const [FirstNameError, setFirstNameError] = useState('');
    const [LastNameError, setLastNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [validated, setValidated] = useState(false);
    const [id, setId] = useState();
    const [roleid, setRoleId] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalReacodes] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [datalenght, setDatalenght] = useState('0');
    const [updateloading, setUpdateLoading] = useState(false);
    const [sorting, setSorting] = useState({ column: "name", order: "asc" });
    const [input, setInput] = useState({
        name: '', email: '',
    })
    const fieldName = [
        { value: "name", name: ["Name"], input: input.name },
        { value: "email", name: ["Email"], input: input.email },
    ];
    const [select, setSelect] = useState({
        status: '', role_id: ''
    })
    const [AllData, setAlldata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirmpassword: '',
        role: '',
    });
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    const fetchData = async () => {
        const value = select?.role_id || select?.status || ''
        setLoading(true);
        return await userApi("users", recordsPerPage, page, sorting.column, sorting.order, value)
            .then((resp) => {
                setLoading(false);
                setAdministrator(resp.data.document);
                const totalPages = Math.ceil(resp.data.result / (recordsPerPage));
                setTotalPages(totalPages);
                setTotalReacodes(resp.data.result);
                setDatalenght(resp.data.datalength);
            })
    }
    const fetchRoleData = async () => {
        return RoleGetApiDetails()
            .then((resp) => {
                setRoleData(resp.data.document)
            })
    }
    const renderUsersData = ({ item, index }) => {
        return <tr key={index} className="odd">
            <td className="sorting_1">{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>{item?.status === 1 ?
                <span className="badge bg-success bg-opacity-20 text-success ms-2">Active</span>
                :
                <span className="badge bg-danger bg-opacity-20 text-danger ms-2">Inactive</span>}
            </td>
            <td>
                {item.email!=="smitbutani2001@gmail.com" ?
                <PermissionHelper Permissionname="edit-administrators">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip1">Edit administrator</Tooltip>}
                    >
                        <span onClick={(e) => handleShow(e, item)} className='edit-administrators text-dark'>
                            <i className="ph ph-pen"></i>
                        </span>
                    </OverlayTrigger>
                </PermissionHelper>
            :null}
                {item?._id !== Cookies.get('Loginid') && item?.role !== 'admin' && item.email!=="smitbutani2001@gmail.com" ?
                    <PermissionHelper Permissionname="delete-administrators">

                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip1">Delete administrator</Tooltip>}
                        >
                            <span onClick={(e) => deleteItem(e, item._id)} className="text-danger delete-icon">
                                <i className="ph ph-trash"></i>
                            </span>
                        </OverlayTrigger>
                    </PermissionHelper>
                    : null}
            </td>
        </tr>
    }
    const onPageChanged = (page) => {
        setPage(page);
    }
    const onChangeRecordsPerPage = (event) => {
        setRecordsPerPage(parseInt(event.target.value));
        setPage(1);
    }
    const handleShow = (e, item) => {
        e.preventDefault();
        fetchRoleData();
        setShow(true);
        setRoleId(item.role_id);
        viewdata(item._id);
    }
    let viewdata = async (id) => {
        setUpdateLoading(true);
        setId(id);
        const resp = await GetDetailsById(id, "users");
        setAlldata(resp.data.document);
        setUpdateLoading(false);
    }
    const deleteItem = async (e, id) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete?")) {
            return DeleteApiDetails(id, "users")
                .then((resp) => {
                    toast.success(resp.data.message);
                    fetchData();
                })
        }
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else if (AllData.password !== AllData.confirmpassword &&
            AllData.password !== "") {
            setConfirmPasswordError("Password and confirm password do not match.");
        }
        else {
            setUpdateLoading(true);
            const data = {
                first_name: AllData.first_name,
                last_name: AllData.last_name,
                email: AllData.email,
                phone_number: AllData.phone_number,
                confirmpassword: AllData.confirmpassword,
                role: AllData.role
            }
            if (AllData.password) {
                data.password = AllData.password;
            }
            try {
                const resp = await UpdateApiDetails(JSON.stringify(data), id, "users");
                fetchData();
                handleClose();
                setValidated(false);
                setUpdateLoading(false);
                setAlldata('')
                toast.success(resp.data.message);
                setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('');
            } catch (error) {
                setUpdateLoading(false);
                setFirstNameError(error?.response?.data.error.errors?.first_name?.message);
                setLastNameError(error?.response?.data.error.errors?.last_name?.message);
                setEmailError(error?.response?.data.error.errors?.email?.message);
                setPasswordError(error?.response?.data.error.errors?.password?.message);
                setConfirmPasswordError(error?.response?.data.error.errors?.confirmpassword?.message);
                setRoleError(error?.response?.data.error.errors?.role?.message);
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, [recordsPerPage, page, sorting, select]);
    useEffect(() => {
        fetchRoleData();
    }, [])
    const reloadData = () => {
        fetchData();
    }
    return (
        <>
            <ToastContainer />
            {/* Page header */}
            <div className="page-header page-header-light shadow">
                <div className="page-header-content d-lg-flex">
                    <div className="d-flex">
                        <h4 className="page-title mb-0">
                            Administrators
                        </h4>
                        <Link href="/" className="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                            <i className="ph-caret-down collapsible-indicator ph-sm m-1" />
                        </Link>
                    </div>
                    <div className="collapse d-lg-block my-lg-auto ms-lg-auto" id="page_header">

                    </div>
                </div>
                <div className="page-header-content d-lg-flex border-top">
                    <div className="d-flex">
                        <div className="breadcrumb py-2">
                            <Link href="/" className="breadcrumb-item"><i className="ph-house" /></Link>
                            <Link href="/" className="breadcrumb-item">Home</Link>
                            <span className="breadcrumb-item active">Administrators</span>
                        </div>
                        <Link href="/" className="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                            <i className="ph-caret-down collapsible-indicator ph-sm m-1" />
                        </Link>
                    </div>
                    <div className="collapse d-lg-block ms-lg-auto" id="breadcrumb_elements">

                    </div>
                </div>
            </div>

            {/* Content area */}
            <div className="content">
                {/* Highlighting rows and columns */}
                <div className="card">
                    <div className="card-header header-elements-inline d-inline-block">
                        <h5 className="d-inline-block">Administrators</h5>
                        <div className="header-elements float-end">
                            <div className="list-icons">
                                <PermissionHelper Permissionname="add-administrators">
                                    <Add reloadData={reloadData} />
                                </PermissionHelper>
                            </div>
                        </div>
                    </div>
                    <> <DataTable loading={loading} setLoading={setLoading} roledata={roledata} Getdata={fetchData} Users={administrator} setUsers={setAdministrator} apiname="users" recordsPerPage={recordsPerPage} setTotalPages={setTotalPages} setTotalReacodes={setTotalReacodes} setDatalenght={setDatalenght} fieldName={fieldName} input={input} setInput={setInput} renderUsersData={renderUsersData} page={page} setSorting={setSorting} sorting={sorting} setPage={setPage} select={select} setSelect={setSelect} />
                        <PaginationCustom
                            currentPage={page}
                            totalCount={totalRecords}
                            pageSize={recordsPerPage}
                            datalenght={datalenght}
                            onPageChange={page => onPageChanged(page)}
                            onChangeRecordsPerPage={e => onChangeRecordsPerPage(e)} />
                    </>
                </div>
                {/* /highlighting rows and columns */}
            </div>
            <div id="user-modal" className="modal fade" aria-hidden="true" style={{ display: 'none' }}><div className="modal-dialog modal-md">
                <div className="modal-content">
                </div>
            </div>
            </div>
            {/* /content area */}
            <ModalPopup title="Edit Administrator" show={show} handleClose={() => { { setShow(false); setAlldata(''); setValidated(false); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('') } }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {updateloading ? <LoadingPage /> : null}
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
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
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
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmpassword"
                                        value={AllData.confirmpassword || ''}
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
                            <Form.Group as={Col} >
                                <Form.Label>Role<span className="text-danger"> * </span></Form.Label>
                                {AllData?.role === 'admin' ?
                                    <Select2
                                        disabled
                                        className="form-control"
                                        options={{ placeholder: "Select Role" }}
                                        data={roledata.map((item, index) => { return ({ id: item.id, text: item.role }) })}
                                        name="role"
                                        onChange={handleAllChange}
                                        value={AllData.role || ""}
                                    />
                                    :
                                    <Select2
                                        required
                                        className="form-control"
                                        options={{ placeholder: "Select Role" }}
                                        data={roledata.map((item, index) => { return ({ id: item.id, text: item.role }) })}
                                        name="role"
                                        onChange={handleAllChange}
                                        value={AllData.role || ""}
                                    />
                                }
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
                    <ModalButton handleClose={() => { { setAlldata(''), setShow(false); setValidated(false); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('') } }} />
                </Form>
            </ModalPopup>
        </>
    )
}
export default List;