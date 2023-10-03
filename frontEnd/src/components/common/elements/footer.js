import Link from "next/link"

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <>
            <div className="navbar navbar-sm navbar-footer border-top">
                <div className="container-fluid">
                    <span>© {year} <Link href="/">{process.env.NEXT_PUBLIC_APP_NAME}</Link></span>
                    <ul className="nav">
                    </ul>
                </div>
            </div>

        </>
    )
}
export default Footer