import React, { useState } from 'react';

import Menu from '../Menu';
import Message from '../Message';
import Notification from '../Notification';
import Account from '../Account';

interface ActionProps {}

export default function Action(props: ActionProps) {
  const {} = props;

  return (
    <div className="flex items-center h-full">
      <Menu />
      <Message />
      <Notification />
      <Account />
    </div>
  );
}
