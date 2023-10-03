import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "../common/loadingPage";
import PermissionHelper from "../common/helper";
import ErrorPage from "@/pages/404";
import { GetDashboardDetails } from "@/pages/api/axiosRequest";

const Dashboard = () => {
    const [AllData, setAlldata] = useState();
    const [loading, setLoading] = useState(true);
    const Viewdata = async () => {
        const resp = await GetDashboardDetails();
        setLoading(false);
        setAlldata(resp.data);
    }
    useEffect(() => {
        Viewdata();
    }, [])
    return (
        <>
            <PermissionHelper Permissionname="dashboard" errorpage={<ErrorPage />}>
                <div className="page-header page-header-light shadow">
                    <div className="page-header-content d-lg-flex">
                        <div className="d-flex">
                            <h4 className="page-title mb-0">
                                Home - <span className="fw-normal">Dashboard</span>
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
                                <span className="breadcrumb-item active">Dashboard</span>
                            </div>
                            <Link href="/" className="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                                <i className="ph-caret-down collapsible-indicator ph-sm m-1" />
                            </Link>
                        </div>
                        <div className="collapse d-lg-block ms-lg-auto" id="breadcrumb_elements">

                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="row">
                        <div className="col-lg-3">
                            {loading ? <LoadingPage /> : null}
                            {/* Members online */}
                            <div className="card bg-teal text-white">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <h3 className="mb-0">{!AllData ? 0 : AllData?.admin}</h3>
                                        <div className="ms-auto">
                                            <a className="text-white" data-card-action="reload">
                                                <i className="ph ph-user-gear dashboard-icon" />
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        TOTAL ADMIN
                                    </div>
                                </div>
                            </div>
                            {/* /members online */}
                        </div>
                        <div className="col-lg-3">
                            {/* Current server load */}
                            <div className="card bg-pink text-white">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <h3 className="mb-0">{!AllData ? 0 : AllData?.users}</h3>
                                        <div className="ms-auto">
                                            <a className="text-white" data-card-action="reload">
                                                <i className="ph ph-users dashboard-icon" />
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        TOTAL USERS
                                    </div>
                                </div>
                            </div>
                            {/* /current server load */}
                        </div>
                    </div>
                </div>
            </PermissionHelper>
        </>
    )
}
export default Dashboard;