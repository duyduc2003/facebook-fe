import { LayoutProps } from 'interfaces/common';
import React from 'react';

interface EmptyLayoutProps extends LayoutProps {}

const EmptyLayout = (props: EmptyLayoutProps) => {
  const { children } = props;

  return <>{children}</>;
};

export default EmptyLayout;
