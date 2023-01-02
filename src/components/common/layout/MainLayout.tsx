import Head from 'next/head';
import React, { ReactNode } from 'react';

import Footer from './partial/Footer';
import Header from './partial/Header';
import Sidebar from './partial/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>{children}</div>
      </div>
      <Footer />
    </>
  );
}
