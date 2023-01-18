import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Menu from '../Menu';
import Message from '../Message';
import Notification from '../Notification';
import Account from '../Account';
import { breakpoint, routes } from '@/utils/constants/common';
import { useMediaQuery } from 'hooks-react-custom';

interface ActionProps {}

export default function Action(props: ActionProps) {
  const {} = props;

  const router = useRouter();

  const matchQuery = useMediaQuery('min-width', breakpoint.custom_md);

  return (
    <div className="flex items-center h-full">
      <Menu />
      {(router.pathname !== routes.MESSENGER || !matchQuery) && <Message />}
      <Notification />
      <Account />
    </div>
  );
}
