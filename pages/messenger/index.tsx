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
          <div className="h-[calc(100vh_-_56px)] custom_md:block hidden">
            <div className="bg-webWash h-full text-center px-5 flex items-center justify-center text-secondaryText font-[700] text-[20px]">
              Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
            </div>
          </div>
          <div className="custom_md:hidden block">
            <SidebarMessenger />
          </div>
        </Content>
      </Body>
    </>
  );
}

Messenger.Layout = MainLayout;

export default Messenger;
