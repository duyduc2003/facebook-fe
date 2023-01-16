import React, { useEffect, useMemo, useState } from 'react';
import {
  useAsync,
  useIsomorphicLayoutEffect,
  useUpdateEffect,
} from 'hooks-react-custom';

import { toastAlert } from 'components/ToastAlert';
import WrapPost from 'components/WrapPost';
import { PostModal } from 'interfaces/post';
import { getPostsAllField } from 'services/post';

import Posted from './Posted';
import LoadNewPost from './LoadNewPost';
import { ServiceResult } from 'interfaces/common';
import { IconLoading } from 'components/icon';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { actions, selectors } from './PostState';

function ListPost() {
  const postsLocal = useAppSelector(selectors.selectPosts);
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<PostModal[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const { error, execute, status, value } = useAsync<
    ServiceResult<PostModal[]>
  >(getPostsAllField, false);

  useIsomorphicLayoutEffect(() => {
    if (status === 'idle') {
      execute();
    } else if (status === 'pending') {
      setPending(true);
    } else if (status === 'success' && value !== null) {
      const { isError, data } = value;
      if (!isError && data) {
        dispatch(actions.setPosts(data));
      } else toastAlert({ type: 'error', message: 'Tải bài viết lỗi.' });
      setPending(false);
    } else if (status === 'error') {
      console.log(error);
      toastAlert({ type: 'error', message: 'Tải bài viết lỗi.' });
    }
  }, [status]);

  useEffect(() => {
    setPosts(postsLocal);
  }, [postsLocal]);

  return (
    <>
      <LoadNewPost />
      {posts && posts.length > 0 ? (
        posts.map(({ id, body, imageUrl, userAvatar, userName, userID }, i) => (
          <Posted
            key={`${id}-${body}-${i}`}
            avatar={userAvatar}
            fullName={userName || ''}
            img={imageUrl}
            content={body || ''}
            userID={userID}
          />
        ))
      ) : pending ? (
        <WrapPost className="bg-primaryButtonBackground mt-5 flex justify-center items-center">
          <div className="w-5 h-5 mr-2">
            <IconLoading />
          </div>
          <span className="text-primaryText font-[500]">Đang tải bài viết</span>
        </WrapPost>
      ) : (
        <WrapPost className="mt-5 text-sm text-center text-secondaryText font-[400]">
          Không có bài viết nào gần đây.
        </WrapPost>
      )}
    </>
  );
}

export default ListPost;
