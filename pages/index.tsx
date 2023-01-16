import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MainLayout from 'components/common/layout/MainLayout';
import Body from 'components/common/layout/partial/Body';
import Sidebar from 'components/common/layout/partial/Sidebar';
import Content from 'components/common/layout/partial/Content';
import {
  SidebarLeft,
  SidebarRight,
} from 'components/common/layout/partial/Sidebar/modules/HomePage';
import WritePost from 'components/WritePost';
import ListPosted from 'components/ListPosted';
import { searchUser } from 'services/user';

function Home() {
  return (
    <>
      <Head>
        <title>Facebook Demo</title>
      </Head>
      <Body className="bg-webWash min-h-[calc(100vh_-_56px)]">
        <Sidebar className="custom_lg:block hidden max-w-[280px]" size="sm">
          <SidebarLeft />
        </Sidebar>
        <Content size="sm" className="mt-4">
          <WritePost />
          <ListPosted />
        </Content>
        <Sidebar
          className="custom_md:block hidden max-w-[280px]"
          position="right"
          size="sm"
        >
          <SidebarRight />
        </Sidebar>
      </Body>
    </>
  );
}

Home.Layout = MainLayout;

export default Home;
