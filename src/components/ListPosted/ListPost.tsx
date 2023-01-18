import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAsync, useIsomorphicLayoutEffect } from 'hooks-react-custom';

import { toastAlert } from '@/components/ToastAlert';
import WrapPost from '@/components/WrapPost';
import { PostModal } from '@/interfaces/post';
import { getPostsAllField } from '@/services/post';
import { ID, ServiceResult } from '@/interfaces/common';
import { IconLoading } from '@/components/icon';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';

import Posted from './Posted';
import LoadNewPost from './LoadNewPost';
import { actions, selectors } from './PostState';
import SkeletonPost from '@/components/SkeletonLoading/SkeletonPost';

function ListPost() {
  const postsLocal = useAppSelector(selectors.selectPosts);
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<PostModal[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const { error, execute, status, value } = useAsync<
    ServiceResult<PostModal[]>
  >(getPostsAllField, false);

  const handleClickDeletePost = useCallback(
    (e?: any, postID?: ID) => {
      const match = postsLocal.find((p) => p.id === postID);
      if (match) dispatch(actions.deletePostByID(postID || ''));
      else {
        toastAlert({ type: 'info', message: 'Không tìm thấy bài viết.' });
      }
    },
    [postsLocal]
  );

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

  useIsomorphicLayoutEffect(() => {
    setPosts(postsLocal);
  }, [postsLocal]);

  return (
    <>
      <LoadNewPost />
      {postsLocal && postsLocal.length > 0 ? (
        postsLocal.map(
          (
            { id, body, imageUrl, userAvatar, userName, userID, timestamp },
            i
          ) => (
            <Posted
              postID={id}
              key={`${id}-${body}-${i}`}
              avatar={userAvatar}
              fullName={userName || ''}
              img={imageUrl}
              content={body || ''}
              userID={userID}
              timestamp={timestamp}
              onClickDelete={handleClickDeletePost}
            />
          )
        )
      ) : pending ? (
        <SkeletonPost />
      ) : (
        <WrapPost className="mt-5 text-sm text-center text-secondaryText font-[400]">
          Không có bài viết nào gần đây.
        </WrapPost>
      )}
    </>
  );
}

export default ListPost;
