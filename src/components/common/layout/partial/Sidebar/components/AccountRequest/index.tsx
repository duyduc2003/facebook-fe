/* eslint-disable @next/next/no-img-element */
import Button from 'components/Button';
import React from 'react';

interface AccountRequestProps {
  avatar?: string;
  fullName: string;
}

export default function AccountRequest(props: AccountRequestProps) {
  const { avatar = '', fullName = '' } = props;

  return (
    <Button
      target="div"
      overlay
      rounded="8px"
      className="p-2 w-full flex cursor-pointer"
    >
      <div className="w-[60px] h-[60px] mr-[12px]">
        <img
          src={avatar}
          alt=""
          className="w-full h-full rounded-[50%] object-contain"
        />
      </div>
      <div>
        <p className="text-primaryText text-[14px] font-[500] select-none text-left">
          {fullName}
        </p>
        <div className="flex items-center mt-2">
          <Button
            overlay
            rounded="6px"
            className="bg-primaryButtonBackground text-white px-[12px] font-[500] m-1 ml-0 flex items-center text-[14px] py-2 leading-[16px] z-[99]"
          >
            Xác nhận
          </Button>
          <Button
            overlay
            rounded="6px"
            className="bg-secondaryButtonBackground text-primaryText px-[12px] font-[500] flex items-center text-[14px] py-2 leading-[16px] z-[99]"
          >
            Xóa
          </Button>
        </div>
      </div>
    </Button>
  );
}
