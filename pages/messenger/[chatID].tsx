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
import { getUserByID } from '@/src/services/user';
import * as authHelper from '@/utils/helper/AuthHelper';
import { UserModel } from '@/interfaces/auth';

interface DetailChatProps {
  friendData: UserModel;
}

function DetailChat(props: DetailChatProps) {
  const { friendData } = props;

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
          <WrapChat friendData={friendData} />
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

  const friendID = data?.users_id.find(
    (item) => item !== authHelper.getUser()?.id
  );

  const { data: userData, isError: errUser } = await getUserByID(`${friendID}`);

  if (!errUser && userData)
    return {
      props: {
        friendData: userData,
      },
    };

  return {
    redirect: {
      destination: routes.MESSENGER,
      permanent: true,
    },
  };
};
