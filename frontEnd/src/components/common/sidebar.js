import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import PermissionHelper from "./helper";

const SideBar = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [resize, setResize] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setIsActive(current => !current);
    };

    const handleResize = (e) => {
        e.preventDefault();
        setResize(current => !current);
    };
    return (
        <>
            <div className={resize ? "sidebar sidebar-dark sidebar-main sidebar-expand-lg sidebar-main-resized" : "sidebar sidebar-dark sidebar-main sidebar-expand-lg"}>
                <div className="sidebar-content">
                    <div className="sidebar-section">
                        <div className="sidebar-section-body d-flex justify-content-center">
                            <h5 className="sidebar-resize-hide flex-grow-1 my-auto">Navigation</h5>
                            <div>
                                <button type="button" className="btn btn-flat-white btn-icon btn-sm rounded-pill border-transparent sidebar-control sidebar-main-resize d-none d-lg-inline-flex" onClick={(e) => handleResize(e)}>
                                    <i className="ph-arrows-left-right" />
                                </button>
                                <button type="button" className="btn btn-flat-white btn-icon btn-sm rounded-pill border-transparent sidebar-mobile-main-toggle d-lg-none">
                                    <i className="ph-x" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <ul className="nav nav-sidebar">
                            <li className="nav-item">
                                <Link href="/" className={router.pathname === "/" ? "nav-link active" : "nav-link"}>
                                    <i className="ph-house" />
                                    <span>
                                        Dashboard
                                    </span>
                                </Link>
                            </li>
                            <PermissionHelper Permissionname="listing-administrators">
                                <li className="nav-item">
                                    <Link href="/administrators" className={router.pathname === "/administrators" ? "nav-link active" : "nav-link"}>
                                        <i className="ph ph-user-gear" />
                                        <span>
                                            Administrators
                                        </span>
                                    </Link>
                                </li>
                            </PermissionHelper>
                            <li className={(router.pathname === "/roles" || router.pathname === "/email-templates" || router.pathname === `/email-templates/add` || router.pathname === `/email-templates/edit/[index]` || router.pathname === `/roles/manage-role-permissions/[index]` || isActive) ? 'nav-item nav-item-submenu nav-item-open' : 'nav-item nav-item-submenu'} onClick={(e) => handleClick(e)} >
                                <PermissionHelper Permissionname="listing-emailtemplates">
                                    <span className="nav-link" >
                                        <i className="ph-gear" />
                                        <span>Settings</span>
                                    </span>
                                    <ul className={(router.pathname === "/roles" || router.pathname === "/email-templates" || router.pathname === `/email-templates/add` || router.pathname === `/email-templates/edit/[index]` || router.pathname === `/roles/manage-role-permissions/[index]` || isActive) ? "nav-group-sub collapse show" : "nav-group-sub collapse"} data-submenu-title=" Settings">
                                        <PermissionHelper Permissionname="listing-emailtemplates">
                                            <li className="nav-item">
                                                <Link href="/email-templates" className={router.pathname === "/email-templates" || router.pathname === "/email-templates/add" || router.pathname === "/email-templates/edit" || router.pathname === `/email-templates/edit/[index]` ? "nav-link active" : "nav-link"}>
                                                    <span>
                                                        Email Templates
                                                    </span>
                                                </Link>
                                            </li>
                                        </PermissionHelper>
                                        <PermissionHelper
                                            children={<li className="nav-item">
                                                <Link href="/roles" className={router.pathname === "/roles" || router.pathname === `/roles/manage-role-permissions/[index]` ? "nav-link active" : "nav-link"}>
                                                    <span>
                                                        Roles
                                                    </span>
                                                </Link>
                                            </li>} />
                                    </ul>
                                </PermissionHelper>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SideBar;