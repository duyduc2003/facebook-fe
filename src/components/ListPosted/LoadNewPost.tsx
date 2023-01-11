import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { Unsubscribe } from 'firebase/firestore';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Button from 'components/Button';
import WrapPost from 'components/WrapPost';
import { getNewPosts } from 'services/post';
import { PostModal } from 'interfaces/post';
import { useAppDispatch } from 'hooks/redux';
import { actions, selectors } from './PostState';
import { useAppSelector } from '../../hooks/redux';

interface LoadNewPostProps {}

function LoadNewPost(props: LoadNewPostProps) {
  const {} = props;
  const postsLocal = useAppSelector(selectors.selectPosts);
  const dispatch = useAppDispatch();

  const [NewPosts, setNewPosts] = useState<PostModal[]>([]);

  const sizeNewPosts = useMemo(
    () => Math.abs(postsLocal.length - NewPosts.length),
    [postsLocal.length, NewPosts.length]
  );

  const handleClickLoadNewPosts = useCallback(() => {
    dispatch(actions.addPosts(NewPosts.slice(0, sizeNewPosts)));
  }, [NewPosts, sizeNewPosts]);

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

  return sizeNewPosts > 0 ? (
    <WrapPost className="my-4 !py-0">
      <Button
        className="py-3 flex justify-center items-center text-sm font-[500] bg-primaryButtonBackground text-white text-center w-full h-full"
        overlay
        rounded="8px"
        onClick={handleClickLoadNewPosts}
      >
        <span className="w-2 h-2 inline-block bg-white rounded-[50%] mr-2"></span>
        Có {sizeNewPosts || 0} bài viết mới
      </Button>
    </WrapPost>
  ) : (
    <></>
  );
}

export default memo(LoadNewPost);
