import Link from "next/link";
import errimg from '../assets/images/error_bg.svg';
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/common/loadingPage";
import Head from "next/head";

const ErrorPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
    }, [])
    return (
        <>
            <Head>
                <title>Page Not Found | Limitless</title>
            </Head>
            {loading ? <LoadingPage /> : (
                <div className="content d-flex justify-content-center align-items-center">
                    {/* Container */}
                    <div className="flex-fill">
                        {/* Error title */}
                        <div className="text-center mb-4">
                            <Image src={errimg} className="img-fluid mb-3" height={230} alt />
                            <h1 className="display-3 fw-semibold lh-1 mb-3">404</h1>
                            <h6 className="w-md-25 mx-md-auto">Oops, an error has occurred. <br /> The resource requested could not be found on this server.</h6>
                        </div>
                        {/* /error title */}
                        {/* Error content */}
                        <div className="text-center">
                            <Link href="/" className="btn btn-primary">
                                <i className="ph-house me-2" />
                                Return to dashboard
                            </Link>
                        </div>
                        {/* /error wrapper */}
                    </div>
                    {/* /container */}
                </div>
            )}
        </>
    )
}
export default ErrorPage;