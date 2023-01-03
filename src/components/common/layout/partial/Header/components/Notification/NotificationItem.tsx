/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';
import Button from 'components/Button';
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
        <img
          src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-1/321327963_2905127396461936_1979873473677526466_n.jpg?stp=dst-jpg_p130x130&_nc_cat=104&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=yYlEP-eWzUYAX_HsvDY&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBtJhit1b9NvHGRTrlvQZsddupDwc8SELwIgWJJk9WAcA&oe=63B76BCC"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <p className="text-left line3-3dot max-w-[200px] break-words text-primaryText text-[14px] font-[400] leading-[18.6px] select-none">
          Duy Đức đẹp trai quá nè
        </p>
      </div>
      <div></div>
    </Button>
  );
}
