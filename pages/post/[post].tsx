import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import MainLayout from '@/components/common/layout/MainLayout';
import { getPostById } from '@/services/post';
import { routes } from '@/utils/constants/common';
import { PostModal } from '@/interfaces/post';
import Posted from '@/components/ListPosted/Posted';
import Body from '@/components/common/layout/partial/Body';
import Content from '@/components/common/layout/partial/Content';
import { getUserByID } from '@/services/user';

interface PostDetailProps {
  postData: PostModal;
}

function PostDetail({ postData }: PostDetailProps) {
  return (
    <>
      <Head>
        <title>Post | Facebook </title>
      </Head>
      <Body className="bg-webWash min-h-[calc(100vh_-_56px)]">
        <Content>
          <Posted
            postID={postData.id}
            fullName={postData.userName || ''}
            avatar={postData.userAvatar}
            timestamp={postData.timestamp}
            content={postData.body || ''}
            img={postData.imageUrl}
            userID={postData.userID}
          />
        </Content>
      </Body>
    </>
  );
}

PostDetail.Layout = MainLayout;

export default PostDetail;

export const getServerSideProps: GetServerSideProps<PostDetailProps> = async (
  context
) => {
  const { post } = context.params as ParsedUrlQuery;
  const { data, isError } = await getPostById(`${post}`);
  if (isError && !data)
    return {
      redirect: {
        destination: routes.HOME,
        permanent: true,
      },
    };

  const { data: dataUser, isError: isErrorUser } = await getUserByID(
    data?.userID || ''
  );

  if (isErrorUser && !dataUser)
    return {
      redirect: {
        destination: routes.HOME,
        permanent: true,
      },
    };

  return {
    props: {
      postData: {
        ...data,
        userAvatar: dataUser?.avatar,
        userName: `${dataUser?.firstName} ${dataUser?.lastName}`,
      } as PostModal,
    },
  };
};
