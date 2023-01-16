import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonLoading from '.';

interface SkeletonUserDetailProps {}

function SkeletonUserDetail(props: SkeletonUserDetailProps) {
  const {} = props;

  return (
    <SkeletonLoading className="relative">
      <SkeletonTheme>
        <Skeleton height={200} />
        <div className="flex items-center">
          <Skeleton circle width={100} height={100} />
          <div className="flex-1 ml-5">
            <Skeleton height={40} />
          </div>
        </div>
      </SkeletonTheme>
    </SkeletonLoading>
  );
}

export default SkeletonUserDetail;
