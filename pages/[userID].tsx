import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'hooks-react-custom';
import classNames from 'classnames';

import Image from '@/components/Image';
import Button, { TypeEventClick, TypeOnClickBtn } from '@/components/Button';
import WrapPost from '@/components/WrapPost';
import { PostModal } from '@/interfaces/post';
import { getUserByID } from '@/services/user';
import { UserModel } from '@/interfaces/auth';
import { useAuth } from '@/context/AuthContext';
import { getPostsByUserID } from '@/services/post';
import Posted from '@/components/ListPosted/Posted';
import { toastAlert } from '@/components/ToastAlert';
import MainLayout from '@/components/common/layout/MainLayout';
import Content from '@/components/common/layout/partial/Content';
import SkeletonUserDetail from '@/components/SkeletonLoading/SkeletonUserDetail';

import EditProfile from '@/components/EditProfile';
import { breakpoint, routes } from '@/utils/constants/common';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import SkeletonPost from '@/components/SkeletonLoading/SkeletonPost';
import { ID } from '@/interfaces/common';

interface ProfileProps {
  userData: UserModel;
}

function Profile(props: ProfileProps) {
  const { userData } = props;

  const [pending, setPending] = useState(false);
  const [posts, setPosts] = useState<PostModal[]>([]);

  const { currentUser } = useAuth();

  const maxWidth400 = useMediaQuery('max-width', breakpoint.s);

  const handleClickDeletePost = useCallback(
    (e?: TypeEventClick, postID?: ID) => {
      setPosts((prev) => prev.filter((p) => p.id !== postID));
    },
    []
  );

  useEffect(() => {
    setPending(true);
    getPostsByUserID(userData.id || '')
      .then((data) => {
        const postsData = data?.data?.sort(
          (a, b) => Number(b.timestamp) - Number(a.timestamp)
        );
        setPosts(postsData || []);
        setPending(false);
      })
      .catch((e) => {
        console.log(e);
        setPending(false);
      });
  }, [userData?.id]);

  return (
    <>
      <Head>
        <title>
          {userData?.firstName || ''} {userData?.lastName || ''} | Facebook
        </title>
      </Head>
      <Content className="h-full">
        {!userData ? (
          <div className="h-full">
            <SkeletonUserDetail />
          </div>
        ) : (
          <div className="mt-12 bg-white">
            <div
              className={classNames(
                'flex',
                maxWidth400
                  ? 'flex-col gap-2'
                  : 'flex-row items-center justify-between'
              )}
            >
              <div className="flex md:items-center md:flex-row md:ml-0 ml-4 flex-col gap-5">
                <div className="w-[100px] h-[100px]">
                  <Image
                    src={userData?.avatar || ''}
                    alt={userData?.lastName || ''}
                    rounded
                  />
                </div>
                <div>
                  <h1 className="text-primaryText text-[28px] font-[700]">
                    {userData?.firstName} {userData?.lastName}
                  </h1>
                </div>
              </div>
              <div
                className={classNames('md:mr-0 mr-4', maxWidth400 && 'ml-4')}
              >
                {currentUser?.id !== userData?.id ? (
                  <Button
                    primary
                    overlay
                    rounded="8px"
                    center
                    className="p-[6px_10px] text-[15px] font-[500]"
                  >
                    Nhắn tin
                  </Button>
                ) : (
                  <EditProfile user={userData} />
                )}
              </div>
            </div>
            <div className="mt-10 rounded-[8px] h-full">
              {pending ? (
                <SkeletonPost />
              ) : posts && posts.length > 0 ? (
                posts.map(({ id, body, imageUrl, timestamp, userID }, i) => (
                  <Posted
                    userID={userID || ''}
                    postID={id}
                    key={`${id}-${body}-${i}`}
                    avatar={userData?.avatar}
                    fullName={
                      `${userData?.firstName} ${userData?.lastName}` || ''
                    }
                    img={imageUrl}
                    content={body || ''}
                    timestamp={timestamp}
                    onClickDelete={handleClickDeletePost}
                  />
                ))
              ) : (
                <NotHasPost />
              )}
            </div>
          </div>
        )}
      </Content>
    </>
  );
}

Profile.Layout = MainLayout;

export default Profile;

const NotHasPost = () => (
  <WrapPost className="mb-5 text-sm text-center text-secondaryText font-[400]">
    Không có bài viết nào gần đây.
  </WrapPost>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userID } = context.params as ParsedUrlQuery;
  const { data, isError } = await getUserByID(`${userID}`);
  if (isError && !data) {
    return {
      redirect: {
        destination: routes.HOME,
        permanent: true,
      },
    };
  }

  return {
    props: {
      userData: data || null,
    },
  };
};
