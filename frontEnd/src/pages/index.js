import Dashboard from '@/components/dashboard/dashboard';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | Limitless</title>
      </Head>
      <Dashboard />
    </>
  )
}
