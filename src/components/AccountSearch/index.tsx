/* eslint-disable @next/next/no-img-element */
import Button from 'components/Button';
import { IconClose } from 'components/icon';
import React from 'react';

interface AccountSearchProps {
  iconClose?: boolean;
  onClickClose?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export default function AccountSearch(props: AccountSearchProps) {
  const { iconClose, onClickClose } = props;

  return (
    <Button
      overlay
      rounded="8px"
      className="text-left p-[8px] flex items-center"
    >
      <div className="min-w-[36px] w-[36px] h-[36px] overflow-hidden rounded-[50%] mr-[12px]">
        <img
          src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/313408735_1540215866453503_8961852904959079097_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6CFvmPl72wkAX873xwk&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBuGK_tsrFKpmZjwCJp_KbkdjPa2klUIYHSEH43OSlZKA&oe=63B69931"
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex-1 truncate font-[400] text-[14px] select-none">
        Phạm Thị Trà My
      </div>
      {/* {iconClose && (
        <Button
          overlay
          rounded
          className="w-[28px] h-[28px] z-[100] bgImg-color-secondary"
          onClick={onClickClose}
        >
          <IconClose />
        </Button>
      )} */}
    </Button>
  );
}
