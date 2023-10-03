import '../../src/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/fonts/inter/inter.css';
import '../assets/icons/phosphor/styles.min.css';
import '../assets/css/components.min.css';
import '../assets/css/all.min.css';
import '../assets/css/layout.min.css';
import '../assets/css/layout.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from '@/components/common/protectedRoute';
import Layout from '@/components/common/layout.js/user';
import LoginLayout from '@/components/common/layout.js/login';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetAccountUserDetails } from './api/axiosRequest';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [AllData, setAlldata] = useState();
  let Viewdata = async () => {
    const resp = await GetAccountUserDetails();
    setAlldata(resp.data.user);
  }
  const reloadData = () => {
    Viewdata();
  }
  return (
    <>
      {router.pathname === '/login' || router.pathname === '/signup' || router.pathname === '/forgot-password' || router.pathname === '/reset-password/[index]' ?
        <>
          <ToastContainer />
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        </>
        : (
          <>
            <ToastContainer />
            <ProtectedRoute>
              <Layout AllData={AllData} Viewdata={Viewdata}>
                <Component {...pageProps} reloadData={reloadData} />
              </Layout>
            </ProtectedRoute>
          </>
        )}
    </>
  )
}
