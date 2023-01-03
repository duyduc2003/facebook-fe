/* eslint-disable @next/next/no-img-element */
import React from 'react';

import Button from 'components/Button';
import SidebarItem from '../../SidebarItem';
import { IconFriend, IconGroup, IconMessageColor } from 'components/icon';
import { routes } from 'constants/common';
import { useAuth } from 'context/auth';

interface SidebarLeftProps {}

export default function SidebarLeft(props: SidebarLeftProps) {
  const {} = props;

  const { currentAuth } = useAuth();

  return (
    <div className="mt-[16px] pl-[8px]">
      <SidebarItem
        avatar={currentAuth?.photoURL || ''}
        title={currentAuth?.displayName || ''}
        href="#"
      />
      <SidebarItem icon={<IconFriend />} title="Bạn bè" href={routes.FRIEND} />
      <SidebarItem icon={<IconGroup />} title="Nhóm" href={routes.GROUP} />
      <SidebarItem
        icon={<IconMessageColor />}
        title="Messenger"
        href={routes.MESSENGER}
      />
    </div>
  );
}
