import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonLoading from '.';
import WrapPost from '../WrapPost';

const SkeletonPost = () => {
  return (
    <SkeletonLoading className="my-5">
      <WrapPost className="px-2">
        <SkeletonTheme>
          <div className="flex">
            <Skeleton circle height={40} width={40} />
            <div>
              <div className="ml-0 w-[300px]">
                <Skeleton className="ml-5 w-full" />
              </div>
              <div className="ml-0 w-[150px]">
                <Skeleton className="ml-5 w-full" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Skeleton className="w-full" height={100} />
          </div>
        </SkeletonTheme>
      </WrapPost>
    </SkeletonLoading>
  );
};

export default SkeletonPost;
