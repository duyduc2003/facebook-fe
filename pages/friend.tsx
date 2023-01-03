import Head from 'next/head';

import MainLayout from 'components/common/layout/MainLayout';

function Friend() {
  return (
    <>
      <Head>
        <title>Facebook Friend</title>
      </Head>
      Friend
    </>
  );
}

Friend.Layout = MainLayout;

export default Friend;
