
import List from "@/components/emailTemplates/list";
import PermissionHelper from "@/components/common/helper";
import React from "react";
import ErrorPage from "../404";
import Head from "next/head";

const EmailTemplates = () => {
    return (
        <>
            <Head>
                <title>Email Templates | Limitless</title>
            </Head>
            <PermissionHelper Permissionname="listing-emailtemplates" errorpage={<ErrorPage />}>
                <List />
            </PermissionHelper>
        </>
    )
}
export default EmailTemplates;