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

interface ListPostProps {
  data: PostModal[];
}

function ListPost({ data }: ListPostProps) {
  const [posts, setPosts] = useState<PostModal[]>(data);

  const handleClickDeletePost = useCallback(
    (e?: any, postID?: ID) => {
      const match = posts.find((p) => p.id === postID);
      if (match) setPosts((prev) => prev.filter((item) => item.id !== postID));
      else {
        toastAlert({ type: 'info', message: 'Không tìm thấy bài viết.' });
      }
    },
    [posts]
  );

  return (
    <>
      <LoadNewPost posts={posts} setPosts={setPosts} />
      {posts && posts.length > 0 ? (
        posts.map(
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
      ) : (
        <WrapPost className="mt-5 text-sm text-center text-secondaryText font-[400]">
          Không có bài viết nào gần đây.
        </WrapPost>
      )}
    </>
  );
}

export default ListPost;
