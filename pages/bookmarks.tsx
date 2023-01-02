import Head from 'next/head';

import MainLayout from '../src/components/common/layout/MainLayout';

function Bookmarks() {
  return (
    <>
      <Head>
        <title>Facebook Bookmarks</title>
      </Head>
      Bookmarks
    </>
  );
}

Bookmarks.Layout = MainLayout;

export default Bookmarks;
