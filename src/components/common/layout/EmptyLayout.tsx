import Head from 'next/head';
import React from 'react';

import { LayoutProps } from 'interfaces/common';
import Header from './partial/Header';

interface EmptyLayoutProps extends LayoutProps {}

const EmptyLayout = (props: EmptyLayoutProps) => {
  const { children } = props;

  return <>{children}</>;
};

export default EmptyLayout;
