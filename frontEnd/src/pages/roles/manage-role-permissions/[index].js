import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import CustomAccordion from "../../../components/roles/accordion";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetDetailsById, UpdateApiDetails } from "../../api/axiosRequest";
import LoadingPage from "@/components/common/loadingPage";
import CommonButton from "@/components/common/button";
import Head from "next/head";

const ManagePermission = () => {
    const router = useRouter();
    const id = router.query;
    const [checkedList, setCheckedList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ViewData, setViewData] = useState([]);
    const [AllData, setAlldata] = useState([]);
    const [clicked, setClicked] = useState(null);
    const handleToggle = (index) => {
        if (clicked === index) {
            return setClicked('0');
        }
        setClicked(index);
    };

    const ViewItem = async () => {
        setLoading(true);
        if (id.index !== undefined) {
            const resp = await GetDetailsById(id?.index, "roles");
            setAlldata(resp.data.document.allPermissions.allPermissions);
            setViewData(resp.data.document.permissions);
            setCheckedList(resp.data.document.permissions.map((items) => {
                return (
                    items
                );
            }));
        }
        setLoading(false);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        // Case 1 : The user checks the box
        if (isChecked) {
            setCheckedList([...checkedList, value]);
        }
        // Case 2 : The user unchecks the box
        else {
            const filteredList = checkedList.filter((item) => item !== value);
            setCheckedList(filteredList);
        }
    };
    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            permissions: checkedList
        }
        return UpdateApiDetails(data, id.index, "roles")
            .then((resp) => {
                router.push("/roles");
                toast.success(resp.data.message);
            })
    }
    useEffect(() => {
        ViewItem();
    }, [id.index]);
    return (
        <>
            <Head>
                <title>Manage Permission | Limitless</title>
            </Head>
            {loading ? <LoadingPage /> : null}
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
                            <Link href="/roles" className="breadcrumb-item">Roles</Link>
                            <span className="breadcrumb-item active">Manage Role Permissions</span>
                        </div>
                        <Link href="/" className="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                            <i className="ph-caret-down collapsible-indicator ph-sm m-1" />
                        </Link>
                    </div>
                    <div className="collapse d-lg-block ms-lg-auto" id="breadcrumb_elements">

                    </div>
                </div>
            </div>
            <div className="page-content">
                {/* Main content */}
                <div className="content-wrapper">
                    <div className="content">
                        <div className="row">
                            <div className="col-lg-12">
                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-3 pt-2">
                                        <h6 className="mb-0 font-weight-semibold">
                                            Manage Permissions
                                        </h6>
                                    </div>
                                    <div className="card-group-control card-group-control-left" id="accordion-control">
                                        {AllData ? AllData.map((item, index) => {
                                            return (
                                                <CustomAccordion onToggle={() => handleToggle(index)} active={clicked === null ? "true" : clicked === index ? "false" : null} key={index} title={item.group} index={index} item={item} ViewData={ViewData} handleChange={handleChange} />
                                            )
                                        }) : null}
                                    </div>
                                    <div className="text-end">
                                        <CommonButton link="/roles" />
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManagePermission;