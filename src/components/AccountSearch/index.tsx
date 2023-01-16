/* eslint-disable @next/next/no-img-element */
import Button from 'components/Button';
import { IconClose } from 'components/icon';
import Image from 'components/Image';
import Link from 'next/link';
import React from 'react';
import { TypeOnClickBtn } from '../Button/index';

interface AccountSearchProps {
  fullName: string;
  avatar: string;
  link: string;
  onClick: TypeOnClickBtn;
}

export default function AccountSearch(props: AccountSearchProps) {
  const { avatar = '', fullName = '', link = '#', onClick } = props;

  return (
    <Link href={link} className="block w-full">
      <Button
        overlay
        rounded="8px"
        className="text-left p-[8px] flex items-center w-full"
        onClick={onClick}
      >
        <div className="min-w-[36px] w-[36px] h-[36px] mr-[12px]">
          <Image src={avatar} alt={fullName} rounded />
        </div>
        <div className="flex-1 truncate font-[400] text-[14px] select-none">
          {fullName}
        </div>
      </Button>
    </Link>
  );
}
