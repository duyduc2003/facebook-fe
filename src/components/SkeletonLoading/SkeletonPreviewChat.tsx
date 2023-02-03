import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonLoading from '.';

interface SkeletonPreviewChatProps {}

const SkeletonPreviewChat = (props: SkeletonPreviewChatProps) => {
  const {} = props;

  return (
    <SkeletonLoading className="relative">
      <SkeletonTheme>
        <div className="flex my-2 px-2 items-center">
          <Skeleton circle width={56} height={56} />
          <div className="w-full flex-1 px-3">
            <Skeleton className="w-full px-3" height={30} />
            <Skeleton className="w-full px-3" height={10} />
          </div>
        </div>
      </SkeletonTheme>
    </SkeletonLoading>
  );
};

export default SkeletonPreviewChat;
