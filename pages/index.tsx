import Head from 'next/head';

import MainLayout from 'components/common/layout/MainLayout';
import Body from 'components/common/layout/partial/Body';
import Sidebar from 'components/common/layout/partial/Sidebar';
import Content from 'components/common/layout/partial/Content';
import {
  SidebarLeft,
  SidebarRight,
} from 'components/common/layout/partial/Sidebar/modules/HomePage';
import WrapPost from 'components/WrapPost';
import WritePost from 'components/WritePost';
import Posted from 'components/Posted';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { routes } from 'utils/constants/common';
import { getAllPost, getPosts } from 'services/post';
import { toastAlert } from 'components/ToastAlert/index';
import { PostModal } from 'interfaces/post';
import fakeData from 'utils/constants/fakeData';
import { firestore } from 'appFirebase';

function Home() {
  const route = useRouter();

  const [posts, setPosts] = useState<PostModal[]>([]);

  useEffect(() => {
    try {
      getAllPost(({ data, isError }) => {
        if (!isError && data) {
          setPosts(data);
        } else toastAlert({ type: 'error', message: 'Tải bài viết lỗi' });
      });
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:28 ~ error', error);
    }
  }, [posts]);

  return (
    <>
      <Head>
        <title>Facebook Demo</title>
      </Head>
      <Body className="bg-webWash min-h-[calc(100vh_-_56px)]">
        <Sidebar className="custom_lg:block hidden max-w-[280px]" size="sm">
          <SidebarLeft />
        </Sidebar>
        <Content size="sm">
          <WritePost />
          {posts && posts.length > 0 ? (
            posts.map(({ id, body, imageUrl, userAvatar, userName }, i) => (
              <Posted
                key={`${id}-${body}-${i}`}
                avatar={userAvatar}
                fullName={userName || ''}
                img={imageUrl}
                content={body}
              />
            ))
          ) : (
            <WrapPost className="mt-5 text-sm text-center text-secondaryText font-[400]">
              Không có bài viết nào gần đây.
            </WrapPost>
          )}
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
