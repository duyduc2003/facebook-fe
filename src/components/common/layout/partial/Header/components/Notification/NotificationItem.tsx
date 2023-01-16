/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';
import Button from 'components/Button';
import Image from 'components/Image';
import React from 'react';

interface NotificationItemProps {}

export default function NotificationItem(props: NotificationItemProps) {
  const {} = props;

  return (
    <Button
      overlay
      rounded="8px"
      className="mx-[8px] p-[8px] flex items-center overflow-hidden"
    >
      <div className="min-w-[56px] w-[56px] h-[56px] rounded-[50%] overflow-hidden mr-[12px]">
        <Image src="" alt="" rounded />
      </div>
      <div className="flex-1">
        <p className="text-left line3-3dot max-w-[200px] break-words text-primaryText text-[14px] font-[400] leading-[18.6px] select-none">
          Bạn có thông báo.
        </p>
      </div>
      <div></div>
    </Button>
  );
}
