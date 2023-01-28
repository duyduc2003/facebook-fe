import Head from 'next/head';
import * as React from 'react';

import { WrapChat } from '@/components/Chat';
import MainLayout from '@/components/common/layout/MainLayout';
import Body from '@/components/common/layout/partial/Body';
import Content from '@/components/common/layout/partial/Content';
import Sidebar from '@/components/common/layout/partial/Sidebar';
import SidebarMessenger from '@/components/common/layout/partial/Sidebar/modules/Messenger';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getChatDetailByID } from '@/services/chat';
import { routes } from '@/utils/constants/common';
import { PreviewChatModal } from '@/interfaces/chat';
import { useAuth } from '@/context/AuthContext';

interface DetailChatProps {
  chatData: PreviewChatModal;
}

function DetailChat(props: DetailChatProps) {
  const { chatData } = props;

  const { currentUser } = useAuth();
  const friend = React.useMemo(
    () => chatData.users.find((item) => item.id !== currentUser?.id),
    [chatData.users, currentUser?.id]
  );

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
          <WrapChat friendData={friend} />
        </Content>
      </Body>
    </>
  );
}

DetailChat.Layout = MainLayout;

export default DetailChat;

export const getServerSideProps: GetServerSideProps<DetailChatProps> = async (
  context
) => {
  const { chatID } = context.params as ParsedUrlQuery;
  const { data, isError } = await getChatDetailByID(`${chatID}`);

  if (!isError && data)
    return {
      props: {
        chatData: data,
      },
    };

  return {
    redirect: {
      destination: routes.MESSENGER,
      permanent: true,
    },
  };
};
