import List from "@/components/administrators/list";
import PermissionHelper from "@/components/common/helper";
import ErrorPage from "./404";
import Head from "next/head";

const Users = () => {
    return (
        <>
            <Head>
                <title>Administrators | Limitless</title>
            </Head>
            <PermissionHelper Permissionname="listing-administrators" errorpage={<ErrorPage />}>
                <List />
            </PermissionHelper>
        </>
    )
}
export default Users;