import Head from 'next/head';

import MainLayout from '@/components/common/layout/MainLayout';
import Body from '@/components/common/layout/partial/Body';
import { SidebarLeft } from '@/components/common/layout/partial/Sidebar/modules/HomePage';
import Content from '@/components/common/layout/partial/Content';

function Bookmarks() {
  return (
    <>
      <Head>
        <title>Facebook Bookmarks</title>
      </Head>
      <Body className="bg-webWash min-h-[calc(100vh_-_56px)]">
        <Content>
          <SidebarLeft />
        </Content>
      </Body>
    </>
  );
}

Bookmarks.Layout = MainLayout;

export default Bookmarks;
