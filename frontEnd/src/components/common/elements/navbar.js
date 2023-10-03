import Image from 'next/image';
import logoimg from '../../../assets/images/logo_icon.svg';
import logotextimg from '../../../assets/images/logo_text_light.svg';
import defaultimg from '../../../assets/images/default-avatar.png';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const NavBar = ({ AllData, Viewdata }) => {
    const router = useRouter();
    const handleClick = (e) => {
        e.preventDefault();
        Cookies.remove("AuthToken");
        router.push("/login");
        toast.error("You have successfully logged out.");
    }
    const handleClickProfile = (e) => {
        e.preventDefault();
        router.push("/edit-profile");
    }
    useEffect(() => {
        Viewdata();
    }, [])
    return (
        <>
            <div className="navbar navbar-dark navbar-expand-lg navbar-static border-bottom border-bottom-white border-opacity-10">
                <div className="container-fluid">
                    <div className="d-flex d-lg-none me-2">
                        <button type="button" className="navbar-toggler sidebar-mobile-main-toggle rounded-pill">
                            <i className="ph-list" />
                        </button>
                    </div>
                    <div className="navbar-brand flex-1 flex-lg-0">
                        <Link href="/" className="d-inline-flex align-items-center">
                            <Image src={logoimg} alt="img" width={50} height={200} />
                            <Image src={logotextimg} className="d-none d-sm-inline-block h-16px ms-3" width={80} height={200} alt="img" />
                        </Link>
                    </div>
                    <div className="navbar-collapse justify-content-center flex-lg-1 order-2 order-lg-1 collapse" id="navbar_search">
                    </div>
                    <ul className="nav flex-row justify-content-end order-1 order-lg-2">
                        <li className="nav-item nav-item-dropdown-lg dropdown ms-lg-2">
                            <Dropdown>
                                <Dropdown.Toggle className="navbar-nav-link align-items-center rounded-pill p-1 border-transparent" data-bs-toggle="dropdown" aria-expanded="false" variant='none'>
                                    <div className="status-indicator-container">
                                        {!AllData?.avatar ?
                                            <Image src={defaultimg} className="w-32px h-32px rounded-pill" alt="img" width={34} height={34} />
                                            : <img src={AllData && AllData?.avatar} className="w-32px h-32px rounded-pill" alt="img" width={34} height={34} />
                                        }
                                        <span className="status-indicator bg-success" />
                                    </div>
                                    <span className="d-none d-lg-inline-block mx-lg-2 user-name">{AllData && AllData?.name}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/edit-profile" onClick={(e) => handleClickProfile(e)} className="dropdown-item">
                                        <i className="ph-gear me-2" />
                                        Account settings
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/login" onClick={(e) => handleClick(e)}><i className="ph-sign-out me-2"></i>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default NavBar;