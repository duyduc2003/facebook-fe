import {
  useIsomorphicLayoutEffect,
  useMemoCompare,
  usePrevious,
} from 'hooks-react-custom';
import { Unsubscribe } from 'firebase/firestore';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Button';
import WrapPost from '@/components/WrapPost';
import { getNewPosts } from '@/services/post';
import { PostModal } from '@/interfaces/post';
import { useAppDispatch } from '@/hooks/redux';
import { useAppSelector } from '@/hooks/redux';
import { useAuth } from '@/context/AuthContext';

interface LoadNewPostProps {
  posts: PostModal[];
  setPosts: React.Dispatch<React.SetStateAction<PostModal[]>>;
}

function LoadNewPost(props: LoadNewPostProps) {
  const { posts, setPosts } = props;

  const [NewPosts, setNewPosts] = useState<PostModal[]>([]);

  const sizeNewPost = useMemo(
    () => NewPosts.length - posts.length,
    [NewPosts.length, posts.length]
  );

  const handleClickLoadNewPosts = useCallback(() => {
    const newP = NewPosts.slice(0, sizeNewPost);
    setPosts((prev) => [...newP, ...prev]);
  }, [NewPosts, setPosts, sizeNewPost]);

  useIsomorphicLayoutEffect(() => {
    let unsub: Unsubscribe = () => {};
    (async () => {
      const { unsubscribe } = await getNewPosts(({ isError, data }) => {
        if (!isError && data) {
          setNewPosts(data);
        }
      });
      unsub = unsubscribe;
    })();
    return () => {
      unsub();
    };
  }, []);

  return sizeNewPost > 0 ? (
    <WrapPost className="my-4 !py-0">
      <Button
        className="py-3 flex justify-center items-center text-sm font-[500] bg-primaryButtonBackground text-white text-center w-full h-full"
        overlay
        rounded="8px"
        onClick={handleClickLoadNewPosts}
      >
        <span className="w-2 h-2 inline-block bg-white rounded-[50%] mr-2"></span>
        Có {sizeNewPost} bài viết mới
      </Button>
    </WrapPost>
  ) : (
    <></>
  );
}

export default memo(LoadNewPost);
