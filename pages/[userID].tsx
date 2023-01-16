import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import Image from 'components/Image';
import Button from 'components/Button';
import WrapPost from 'components/WrapPost';
import { PostModal } from 'interfaces/post';
import { getUserByID } from 'services/user';
import { UserModel } from 'interfaces/auth';
import { useAuth } from 'context/AuthContext';
import { getPostsByUserID } from 'services/post';
import Posted from 'components/ListPosted/Posted';
import { toastAlert } from 'components/ToastAlert';
import MainLayout from 'components/common/layout/MainLayout';
import Content from 'components/common/layout/partial/Content';
import SkeletonUserDetail from 'components/SkeletonLoading/SkeletonUserDetail';
import { useMediaQuery } from 'hooks-react-custom';
import classNames from 'classnames';
import EditProfile from 'components/EditProfile';

interface ProfileProps {}

function Profile(props: ProfileProps) {
  const {} = props;

  const [pending, setPending] = useState(false);
  const [user, setUser] = useState<UserModel | undefined>();
  const [posts, setPosts] = useState<PostModal[]>([]);

  const { currentUser } = useAuth();

  const router = useRouter();

  const userID: string = useMemo(
    () =>
      (Array.isArray(router?.query?.userID) ? '' : router?.query?.userID) || '',
    [router.query.userID]
  );

  const maxWidth400 = useMediaQuery('max-width', '400px');

  useEffect(() => {
    setPending(true);
    getUserByID(userID)
      .then((data) => {
        const { isError, data: _user } = data;
        if (!isError && _user) {
          setUser(_user);
          getPostsByUserID(_user.id || '')
            .then((data) => {
              setPending(false);
              setPosts(data?.data || []);
            })
            .catch((e) => console.log(e));
        } else
          toastAlert({
            type: 'error',
            message: 'Không tồn tại người dùng này',
          });

        setPending(false);
      })
      .catch((error) => console.log(error));
  }, [userID]);

  return (
    <>
      <Head>
        <title>
          {user?.firstName || ''} {user?.lastName || ''} | Facebook
        </title>
      </Head>
      <Content className="h-full">
        {pending ? (
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
                    src={user?.avatar || ''}
                    alt={user?.lastName || ''}
                    rounded
                  />
                </div>
                <div>
                  <h1 className="text-primaryText text-[28px] font-[700]">
                    {user?.firstName} {user?.lastName}
                  </h1>
                </div>
              </div>
              <div
                className={classNames('md:mr-0 mr-4', maxWidth400 && 'ml-4')}
              >
                {currentUser?.id !== user?.id ? (
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
                  <EditProfile user={user} />
                )}
              </div>
            </div>
            <div className="mt-10 rounded-[8px] h-full">
              {posts && posts.length > 0 ? (
                posts.map(({ id, body, imageUrl }, i) => (
                  <Posted
                    key={`${id}-${body}-${i}`}
                    avatar={user?.avatar}
                    fullName={`${user?.firstName} ${user?.lastName}` || ''}
                    img={imageUrl}
                    content={body || ''}
                  />
                ))
              ) : (
                <WrapPost className="mb-5 text-sm text-center text-secondaryText font-[400]">
                  Không có bài viết nào gần đây.
                </WrapPost>
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
