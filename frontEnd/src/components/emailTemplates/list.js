import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { Api } from "../../pages/api/axiosRequest";
import PaginationCustom from "../pagination/pagination";
import DataTable from "../common/customDataTable";
import Link from "next/link";
import PermissionHelper from "../common/helper";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const List = () => {
    const [EmailTemplate, setEmailTemplate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalReacodes] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [datalenght, setDatalenght] = useState('0');
    const [sorting, setSorting] = useState({ column: "subject", order: "asc" });
    const [input, setInput] = useState({
        subject: '', description: '', slug: '',
    })
    const fieldName = [
        { value: "subject", name: ["Subject"], input: input.subject },
        { value: "description", name: ["Description"], input: input.description },
        { value: "slug", name: ["Slug"], input: input.slug },
    ];

    const fetchData = async () => {
        setLoading(true);
        return Api("email-templates", recordsPerPage, page, sorting.column, sorting.order)
            .then((resp) => {
                setLoading(false);
                setEmailTemplate(resp.data.document);
                const totalPages = Math.ceil(resp.data.result / (recordsPerPage));
                setTotalPages(totalPages);
                setTotalReacodes(resp.data.result);
                setDatalenght(resp.data.datalength);
            })
    }
    const renderUsersData = ({ item, index }) => {
        return <tr role="row" className="odd">
            <td className="sorting_1">{index + 1}</td>
            <td>{item.subject}</td>
            <td>{item.description}</td>
            <td>{item.slug}</td>
            <td>
                <PermissionHelper Permissionname="edit-emailtemplates">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip1">Edit email template</Tooltip>}
                    >
                        <Link href={`/email-templates/edit/${item._id}`} className="btn edit-role text-dark">
                            <i className="ph ph-note-pencil"></i>
                        </Link>
                    </OverlayTrigger>
                </PermissionHelper>
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
                            Email Templates
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
                            <span className="breadcrumb-item active">Email Templates</span>
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
            <div className="content content-administrators">
                {/* Highlighting rows and columns */}
                <div className="card">
                    <div className="card-header header-elements-inline">
                        <h5 className="card-title">Email Templates</h5>
                        <div className="header-elements">
                            <div className="list-icons">
                            </div>
                        </div>
                    </div>
                    <> <DataTable loading={loading} setLoading={setLoading} Getdata={fetchData} Users={EmailTemplate} setUsers={setEmailTemplate} apiname="email-templates" recordsPerPage={recordsPerPage} setTotalPages={setTotalPages} setTotalReacodes={setTotalReacodes} setDatalenght={setDatalenght} fieldName={fieldName} input={input} setInput={setInput} renderUsersData={renderUsersData} page={page} setSorting={setSorting} sorting={sorting} setPage={setPage} />
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
        </>
    )
}
export default List;