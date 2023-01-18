import Head from 'next/head';

import MainLayout from '@/components/common/layout/MainLayout';
import Body from '@/components/common/layout/partial/Body';
import Sidebar from '@/components/common/layout/partial/Sidebar';
import Content from '@/components/common/layout/partial/Content';
import SidebarMessenger from '@/components/common/layout/partial/Sidebar/modules/Messenger';
import { WrapChat } from '@/components/Chat';

function Messenger() {
  return (
    <>
      <Head>
        <title>Facebook Messenger</title>
      </Head>
      <Body>
        <Sidebar className="border-r custom_md:block hidden">
          <SidebarMessenger />
        </Sidebar>
        <Content size="full">
          <WrapChat />
        </Content>
      </Body>
    </>
  );
}

Messenger.Layout = MainLayout;

export default Messenger;
