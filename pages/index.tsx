import Head from 'next/head';

import MainLayout from '../src/components/common/layout/MainLayout';

function Home() {
  return (
    <>
      <Head>
        <title>Facebook Demo</title>
      </Head>
      1
    </>
  );
}

Home.Layout = MainLayout;

export default Home;
