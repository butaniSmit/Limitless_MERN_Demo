import React from "react";
import Footer from "../elements/footer";
import NavBar from "../elements/navbar";
import SideBar from "../sidebar";
import Head from "next/head";
// import Sidebar from "../sidebar";

const Layout = ({ children, AllData, Viewdata }) => {

    return (
        <>
        <Head>
            <title>Limitless</title>
        </Head>
            <NavBar AllData={AllData} Viewdata={Viewdata} />
            <div className="page-content">
                <SideBar />
                <div className="content-wrapper">
                    <div className="content-inner">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Layout;