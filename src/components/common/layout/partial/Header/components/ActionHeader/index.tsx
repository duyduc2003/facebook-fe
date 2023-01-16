import React, { useState } from 'react';

import Menu from '../Menu';
import Message from '../Message';
import Notification from '../Notification';
import Account from '../Account';
import { useRouter } from 'next/router';
import { routes } from 'utils/constants/common';

interface ActionProps {}

export default function Action(props: ActionProps) {
  const {} = props;

  const router = useRouter();

  return (
    <div className="flex items-center h-full">
      <Menu />
      {router.pathname !== routes.MESSENGER && <Message />}
      <Notification />
      <Account />
    </div>
  );
}
