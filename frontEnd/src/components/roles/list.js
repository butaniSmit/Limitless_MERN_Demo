import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Add from "./add";
import { ModalPopup, ModalButton } from '../common/modal';
import DataTable from "../common/customDataTable";
import PaginationCustom from "../pagination/pagination";
import { Api, DeleteApiDetails, GetDetailsById, UpdateApiDetails } from "../../pages/api/axiosRequest";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingPage from "../common/loadingPage";

const List = () => {
    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const [NameError, setNameError] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [validated, setValidated] = useState(false);
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalReacodes] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [datalenght, setDatalenght] = useState('0');
    const [sorting, setSorting] = useState({ column: "role", order: "asc" });
    const [updateloading, setUpdateLoading] = useState(false);
    const [input, setInput] = useState({
        role: '', description: '',
    })
    const fieldName = [
        { value: "role", name: ["Name"], input: input.role },
        { value: "description", name: ["Description"], input: input.description },
    ];
    const [AllData, setAlldata] = useState({
        name: '',
        description: '',
    })
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    const fetchData = async () => {
        setLoading(true);
        return Api("roles", recordsPerPage, page, sorting.column, sorting.order)
            .then((resp) => {
                setLoading(false);
                setRoles(resp.data.document);
                const totalPages = Math.ceil(resp.data.result / (recordsPerPage));
                setTotalPages(totalPages);
                setTotalReacodes(resp.data.result);
                setDatalenght(resp.data.datalength);
            })
    }
    const renderUsersData = ({ item, index }) => {
        return (
            <>
                <tr key={index} className="even" >
                    <td className="sorting_1">{index + 1}</td>
                    <td>{item.role}</td>
                    <td>{item.description}</td>
                    <td>
                        {item && item?._id !== "64e480ed420559c2a5a9a02a" ? (
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip1">Manage permissions</Tooltip>}
                                >
                                    <span onClick={() => { router.push(`/roles/manage-role-permissions/${item._id}`) }} className="text-dark table-btn">
                                        <i className="ph ph-gear-six"></i>
                                    </span>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip1">Edit role</Tooltip>}
                                >
                                    <span onClick={(e) => handleShow(e, item)} className='delete-icon icon-home-btn edit-role text-dark table-btn'>
                                        <i className="ph ph-note-pencil"></i>
                                    </span>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip1">Delete role</Tooltip>}
                                >
                                    <span onClick={(e) => deleteItem(e, item._id)} className="delete-icon delete-role text-danger table-btn">
                                        <i className="ph ph-trash"></i>
                                    </span>
                                </OverlayTrigger>
                            </div>
                        ) : null}
                    </td>
                </tr>
            </>
        )
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
        setShow(true);
        viewdata(item._id);
    }
    let viewdata = async (id) => {
        setUpdateLoading(true);
        setId(id);
        const resp = await GetDetailsById(id, "roles");
        setAlldata({ name: resp.data.document.role, description: resp.data.document.description });
        setUpdateLoading(false);
    }
    const deleteItem = async (e, id) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete?")) {
            return DeleteApiDetails(id, "roles")
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
        } else {
            setUpdateLoading(true);
            const data = {
                role: AllData.name,
                description: AllData.description
            }
            try {
                const resp = await UpdateApiDetails(data, id, "roles")
                handleClose();
                fetchData();
                setUpdateLoading(false);
                setValidated(false);
                setAlldata('');
                toast.success(resp.data.message); setNameError('');
            } catch (error) {
                setUpdateLoading(false);
                setNameError(error?.response?.data.error.errors?.role?.message);
            }
        }
    };
    const reloadData = () => {
        fetchData();
    }
    useEffect(() => {
        fetchData();
    }, [recordsPerPage, page, sorting]);
    return (
        <>
            <ToastContainer />
            {/* Page header */}
            <div className="page-header page-header-light shadow">
                <div className="page-header-content d-lg-flex">
                    <div className="d-flex">
                        <h4 className="page-title mb-0">
                            Roles
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
                            <span className="breadcrumb-item active">Roles</span>
                        </div>
                        <Link href="/" className="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                            <i className="ph-caret-down collapsible-indicator ph-sm m-1" />
                        </Link>
                    </div>
                    <div className="collapse d-lg-block ms-lg-auto" id="breadcrumb_elements">

                    </div>
                </div>
            </div>
            {/* /page header */}
            {/* Content area */}
            <div className="content content-role">
                {/* Highlighting rows and columns */}
                <div className="card">
                    <div className="card-header header-elements-inline d-inline-block">
                        <h5 className="d-inline-block">Roles</h5>
                        <div className="header-elements float-end">
                            <div className="list-icons">
                                <Add reloadData={reloadData} />
                            </div>
                        </div>
                    </div>
                    <div className="ag-theme-alpine">
                        <>
                            <DataTable loading={loading} setLoading={setLoading} roledata={roles} Getdata={fetchData} Users={roles} setUsers={setRoles} apiname="roles" recordsPerPage={recordsPerPage} setTotalPages={setTotalPages} setTotalReacodes={setTotalReacodes} setDatalenght={setDatalenght} fieldName={fieldName} input={input} setInput={setInput} renderUsersData={renderUsersData} page={page} setSorting={setSorting} sorting={sorting} setPage={setPage} />
                            <PaginationCustom
                                currentPage={page}
                                totalCount={totalRecords}
                                pageSize={recordsPerPage}
                                datalenght={datalenght}
                                onPageChange={page => onPageChanged(page)}
                                onChangeRecordsPerPage={e => onChangeRecordsPerPage(e)} />
                        </>
                    </div>
                </div>
                {/* /highlighting rows and columns */}
            </div>
            <div id="user-modal" className="modal fade" aria-hidden="true" style={{ display: 'none' }}><div className="modal-dialog modal-md">
                <div className="modal-content">
                </div>
            </div>
            </div>
            {/* /content area */}
            <ModalPopup title="Edit Role" show={show} handleClose={() => { { setAlldata(''); setShow(false); setValidated(false); setNameError(''); } }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {updateloading ? <LoadingPage /> : null}
                    <div className='mb-3'>
                        <Row>
                            <Col className="rowcol">
                                <Form.Group>
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
                    <ModalButton handleClose={() => { { setAlldata(''); setShow(false); setValidated(false); setNameError('') } }} />
                </Form>
            </ModalPopup>
        </>
    )
}
export default List;