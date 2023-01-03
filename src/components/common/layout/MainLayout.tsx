import { routes } from 'constants/common';
import { useAuth } from 'context/auth';
import { useBrowserLayoutEffect } from 'Hooks/useBrowserLayoutEffect';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

import Header from './partial/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  const { currentAuth } = useAuth();

  const route = useRouter();

  useBrowserLayoutEffect(() => {
    if (!currentAuth) route.push(routes.LOGIN);
  }, [currentAuth]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <div className="mt-[56px]">{children}</div>
    </>
  );
}
