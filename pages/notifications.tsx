import Head from 'next/head';

import MainLayout from 'components/common/layout/MainLayout';

function Notifications() {
  return (
    <>
      <Head>
        <title>Facebook Notifications</title>
      </Head>
      Notifications
    </>
  );
}

Notifications.Layout = MainLayout;

export default Notifications;
