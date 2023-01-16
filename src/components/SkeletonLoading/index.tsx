import React, { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';
interface SkeletonLoadingProps {
  children: ReactNode;
  className?: string;
}

function SkeletonLoading(props: SkeletonLoadingProps) {
  const { children, className } = props;

  return <div className={className}>{children}</div>;
}

export default SkeletonLoading;
