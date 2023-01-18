import Head from 'next/head';

import MainLayout from '@/components/common/layout/MainLayout';
import { useAsync, useIsFirstRender } from 'hooks-react-custom';
import { useEffect } from 'react';

import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

function Group() {
  const { handleRedirectLogin } = useAuth();

  return (
    <>
      <Head>{/* <title>Facebook Group</title> */}</Head>
      {/* <Button onClick={() => execute()}>group</Button> */}
    </>
  );
}

Group.Layout = MainLayout;

export default Group;
