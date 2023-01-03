import Head from 'next/head';

import MainLayout from 'components/common/layout/MainLayout';

function Messenger() {
  return (
    <>
      <Head>
        <title>Facebook Messenger</title>
      </Head>
      Messenger
    </>
  );
}

Messenger.Layout = MainLayout;

export default Messenger;
