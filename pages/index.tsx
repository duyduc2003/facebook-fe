import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import MainLayout from '@/components/common/layout/MainLayout';
import Body from '@/components/common/layout/partial/Body';
import Sidebar from '@/components/common/layout/partial/Sidebar';
import Content from '@/components/common/layout/partial/Content';
import {
  SidebarLeft,
  SidebarRight,
} from '@/components/common/layout/partial/Sidebar/modules/HomePage';
import WritePost from '@/components/WritePost';
import { getUsers } from '@/services/user';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getAllPathPosts, getPostsAllField } from '@/services/post';
import { PostModal } from '@/interfaces/post';
import timestamp from '@/utils/helper/timestamp';

const ListPosted = dynamic(() => import('@/components/ListPosted'), {
  ssr: false,
});

interface HomeProps {
  postsData: PostModal[];
}

function Home(props: HomeProps) {
  const { postsData } = props;

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
          <ListPosted data={postsData} />
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data } = await getPostsAllField();

  return {
    props: {
      postsData: data || [],
    },
  };
};

export default Home;
