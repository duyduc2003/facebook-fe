import Head from 'next/head';

import MainLayout from '../src/components/common/layout/MainLayout';

function Group() {
  return (
    <>
      <Head>
        <title>Facebook Group</title>
      </Head>
      group
    </>
  );
}

Group.Layout = MainLayout;

export default Group;
