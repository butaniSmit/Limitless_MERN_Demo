import Cookies from "js-cookie";
import React, { useState, useEffect, Suspense } from "react";

const PermissionHelper = ({ Permissionname, children, errorpage }) => {
    const [roledata, setRoleData] = useState([]);
    const [data, setData] = useState('');
    const RolePermission = roledata.find(items => { return (items === Permissionname) });

    useEffect(() => {
        setRoleData(JSON.parse(Cookies.get("RoleName")));
        setData(JSON.parse(Cookies.get("RoleDetails")));
    }, [])
    return (
        <>
            {RolePermission || Permissionname === "dashboard" || Permissionname === "edit-profile" || data === "admin" ? (children) : <Suspense fallback={children}>{errorpage}</Suspense>}
        </>
    )
}
export default PermissionHelper;