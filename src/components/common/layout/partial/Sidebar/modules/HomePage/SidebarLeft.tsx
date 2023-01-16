/* eslint-disable @next/next/no-img-element */
import React, { memo } from 'react';

import Button from 'components/Button';
import SidebarItem from '../../SidebarItem';
import { IconFriend, IconGroup, IconMessageColor } from 'components/icon';
import { routes } from 'utils/constants/common';
import fakeData from 'utils/constants/fakeData';
import { useAuth } from 'context/AuthContext';

interface SidebarLeftProps {}

export default memo(function SidebarLeft(props: SidebarLeftProps) {
  const {} = props;

  const { currentUser } = useAuth();

  return (
    <div className="mt-[16px] pl-[8px]">
      <SidebarItem
        avatar={currentUser?.avatar || ''}
        title={`${currentUser?.firstName} ${currentUser?.lastName}` || ''}
        href={`/${currentUser?.id}`}
      />
      {/* <SidebarItem icon={<IconFriend />} title="Bạn bè" href={routes.FRIEND} />
      <SidebarItem icon={<IconGroup />} title="Nhóm" href={routes.GROUP} /> */}
      <SidebarItem
        icon={<IconMessageColor />}
        title="Messenger"
        href={routes.MESSENGER}
      />
    </div>
  );
});
