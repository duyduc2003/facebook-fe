import React from 'react';

import Button from '@/components/Button';
import { Icon3Dot } from '@/components/icon';
import ListMessage from '@/components/ListMessage';

interface SidebarMessengerProps {}

function SidebarMessenger(props: SidebarMessengerProps) {
  const {} = props;

  return (
    <div>
      <div className="mt-4 mb-4 px-4 flex justify-between items-center">
        <p className="text-primaryText text-[24px] font-[800] leading-[28px] ">
          Chat
        </p>
        <div className="flex items-center">
          <Button
            secondary
            center
            rounded
            overlay
            className="w-[36px] h-[36px]"
          >
            <Icon3Dot />
          </Button>
        </div>
      </div>
      <div>
        <ListMessage />
      </div>
    </div>
  );
}

export default SidebarMessenger;
