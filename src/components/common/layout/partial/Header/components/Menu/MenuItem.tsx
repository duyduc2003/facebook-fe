import Button from 'components/Button';
import { IconPost } from 'components/icon';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { TypeOnClickBtn } from '../../../../../../Button/index';

export interface MenuItemProps {
  link?: string;
  title: string;
  description: string;
  icon: ReactNode;
  horizontal?: boolean;
  onClick?: TypeOnClickBtn;
}

export default function MenuItem(props: MenuItemProps) {
  const { link, icon, description, title, onClick } = props;

  const Wrap: any = link ? Link : 'div';

  return (
    <Wrap href={link}>
      <Button
        overlay
        rounded="8px"
        className="flex px-[8px] w-full"
        onClick={onClick}
      >
        <div className="w-[36px] h-[36px] my-[6px] mr-[12px] bg-secondaryButtonBackground rounded-[50%] flex items-center justify-center">
          {icon}
        </div>
        <div className="my-[6px] text-primaryText select-none">
          <p className="font-[500] break-words text-[14px] text-left">
            {title}
          </p>
          <p className="font-[400] text-[12px] leading-[14.7px] break-words text-left">
            {description}
          </p>
        </div>
      </Button>
    </Wrap>
  );
}
