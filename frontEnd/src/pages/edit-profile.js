import React, { useState, useEffect } from "react";
import TabContent from "../../src/components/common/tabs/tabContent";
import { TabsTitle } from "../../src/components/common/tabs/tabsTitle";
import ChangeAvatar from "../components/profilePage/changeAvatar";
import ChangePassword from "../components/profilePage/changePassword";
import defaultimg from '../assets/images/default-avatar.png';
import PersonalInfo from "../components/profilePage/personalInfo";
import Link from "next/link";
import { GetAccountUserDetails } from "./api/axiosRequest";
import LoadingPage from "@/components/common/loadingPage";
import PermissionHelper from "@/components/common/helper";
import Head from "next/head";
import bgimg from '../assets/images/panel_bg.png';
import Image from "next/image";

const ProfilePage = ({ reloadData }) => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [AllData, setAlldata] = useState();
    const [loading, setLoading] = useState(false);
    let Viewdata = async () => {
        setLoading(true);
        const resp = await GetAccountUserDetails();
        setLoading(false);
        setAlldata(resp.data.user);
    }
    useEffect(() => {
        Viewdata();
    }, [])
    return (
        <>
            <Head>
                <title>Edit Profile | Limitless</title>
            </Head>
            <div className="page-header page-header-light shadow">
                <div className="page-header-content d-lg-flex">
                    <div className="d-flex">
                        <h4 className="page-title mb-0">
                            Edit Profile
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
                            <span className="breadcrumb-item active">Edit Profile</span>
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
                {/* Inner container */}
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <div className="card">
                            {loading ? <LoadingPage /> : null}
                            <div className="card-body bg-blue text-center card-img-top" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'contain' }}>
                                <div className="card-img-actions d-inline-block mb-3">
                                    {!AllData?.avatar ?
                                        <Image className="img-fluid rounded-circle" src={defaultimg} width={170} height={170} alt='img' />
                                        :
                                        <img className="img-fluid rounded-circle" src={AllData?.avatar} width={170} height={170} alt='img' />
                                    }
                                </div>
                                <h6 className="font-weight-semibold mb-0 card-text">{AllData ? AllData.name : null}</h6>
                                <span className="d-block opacity-75 card-role">{AllData ? AllData.role : null}</span>
                            </div>
                            <div className="card-body border-top-0">
                                <div className="d-sm-flex flex-sm-wrap mb-3">
                                    <div className="font-weight-semibold">Full Name:</div>
                                    <div className="ml-sm-auto mt-2 mt-sm-0"> {AllData ? AllData?.name : null}</div>
                                </div>
                                <div className="d-sm-flex flex-sm-wrap mb-3">
                                    <div className="font-weight-semibold">Phone:</div>
                                    <div className="ml-sm-auto mt-2 mt-sm-0"> {AllData ? AllData?.phone_number : null}</div>
                                </div>
                                <div className="d-sm-flex flex-sm-wrap">
                                    <div className="font-weight-semibold">Email:</div>
                                    <div className="ml-sm-auto mt-2 mt-sm-0"><Link href="#">{AllData ? AllData?.email : null}</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /left sidebar component */}
                    {/* Right content */}
                    <div className="col-12 col-lg-9">
                        <div className="card">
                            <div className="card-header header-elements-inline">
                                <h6 className="card-title">Profile</h6>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-tabs nav-tabs-underline nav-justified">
                                    <TabsTitle title="Personal Info" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    {/* <PermissionHelper Permissionname="change-avatar">
                                        <TabsTitle title="Change Avatar" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </PermissionHelper> */}
                                    <PermissionHelper Permissionname="change-password">
                                        <TabsTitle title="Change Password" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </PermissionHelper>
                                </ul>
                                <div className="tab-content">
                                    <TabContent id="tab1" activeTab={activeTab}>
                                        <PersonalInfo reloadData={reloadData} AllData={AllData} />
                                    </TabContent>
                                    {/* <PermissionHelper Permissionname="change-avatar">
                                        <TabContent id="tab2" activeTab={activeTab}>
                                            <ChangeAvatar reloadData={reloadData} />
                                        </TabContent>
                                    </PermissionHelper> */}
                                    <PermissionHelper Permissionname="change-password">
                                        <TabContent id="tab3" activeTab={activeTab}>
                                            <ChangePassword />
                                        </TabContent>
                                    </PermissionHelper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilePage;