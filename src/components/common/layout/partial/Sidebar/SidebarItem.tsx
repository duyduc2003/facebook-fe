/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import Button from '@/components/Button';

const Image = dynamic(() => import('@/components/Image'), { ssr: false });

interface SidebarItemProps {
  avatar?: string;
  icon?: ReactNode;
  title?: string;
  href?: string;
}

export default function SidebarItem(props: SidebarItemProps) {
  const { avatar = '', icon, title = '', href = '#' } = props;

  return (
    <Link href={href}>
      <Button className="w-full p-2 flex items-center" rounded="8px" overlay>
        <div className="w-[36px] h-[36px] mr-[12px]">
          {avatar && !icon && (
            <Image
              src={avatar}
              alt=""
              className="w-full h-full rounded-[50%]"
              rounded
            />
          )}
          {!avatar && icon}
        </div>
        <div className="text-[14px] font-[500] text-primaryText">{title}</div>
      </Button>
    </Link>
  );
}
