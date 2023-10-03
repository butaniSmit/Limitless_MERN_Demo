import { PrivatetRoute } from "../protectedRoute";


const LoginLayout = ({ children }) => {
    return (
        <>
            <PrivatetRoute>
                <div className="page-content login-page-content vh-100">
                    {/* Main content */}
                    <div className="content-wrapper">
                        {/* Inner content */}
                        <div className="content-inner">
                            {/* Content area */}
                            <div className="content d-flex justify-content-center align-items-center">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </PrivatetRoute>
        </>
    )
}
export default LoginLayout;