/* eslint-disable @next/next/no-img-element */
import Button from 'components/Button';
import { IconLogout, IconSetting } from 'components/icon';
import AppTippy, { HeadlessTippy, WrapPopper } from 'components/Popper';
import React, { useState } from 'react';

interface AccountProps {}

export default function Account(props: AccountProps) {
  const {} = props;
  const [showAccount, setShowAccount] = useState(false);

  const handleToggleOpen = () => {
    setShowAccount(!showAccount);
  };

  const handleClose = () => {
    setShowAccount(false);
  };

  const render = (attr: any) => (
    <WrapPopper
      {...attr}
      className="py-[8px] px-[8px] w-[320px] rounded-[8px] shadow-[rgba(0,0,0,0.2)_0px_3px_10px] max-w-[320px]"
    >
      <div className="">
        <Button
          rounded="8px"
          overlay
          className="w-full p-[8px] flex items-center"
        >
          <div className="min-w-[36px] w-[36px] h-[36px] mr-[12px]">
            <img
              src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/316239892_552326750060801_156209680511190881_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=FhZisTFoKXwAX8zlwAY&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfB3zjfFb7jtQ_bJIJsC2JCxQPY_x0oO1AhPv3jvkx7ZDg&oe=63B776B5"
              alt=""
              className="w-full h-full rounded-[50%]"
            />
          </div>
          <div className="text-primaryText text-[15px] font-[500] break-words select-none ">
            Đặng Duy Đức
          </div>
        </Button>
      </div>
      <hr className="my-[8px] mx-[8px]" />
      <div>
        <Button
          overlay
          rounded="8px"
          className="p-[8px] w-full flex items-center"
        >
          <div className="mr-[12px] w-[36px] h-[36px] bg-secondaryButtonBackground rounded-[50%] flex items-center justify-center">
            <IconSetting />
          </div>
          <div className="text-primaryText text-[14px] font-[500]">Cài đặt</div>
        </Button>
        <Button
          overlay
          rounded="8px"
          className="p-[8px] w-full flex items-center"
        >
          <div className="mr-[12px] w-[36px] h-[36px] bg-secondaryButtonBackground rounded-[50%] flex items-center justify-center">
            <IconLogout />
          </div>
          <div className="text-primaryText text-[14px] font-[500]">
            Đăng xuất
          </div>
        </Button>
      </div>
    </WrapPopper>
  );

  return (
    <div>
      <HeadlessTippy
        onClickOutside={handleClose}
        visible={showAccount}
        render={render}
      >
        <div>
          <AppTippy content="Tài khoản">
            <div>
              <Button
                rounded
                overlay
                active={showAccount}
                className="flex items-center justify-center bg-secondaryButtonBackground w-[40px] h-[40px] ml-[8px]"
                onClick={handleToggleOpen}
              >
                <img
                  src={
                    'https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/316239892_552326750060801_156209680511190881_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=FhZisTFoKXwAX8zlwAY&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfB3zjfFb7jtQ_bJIJsC2JCxQPY_x0oO1AhPv3jvkx7ZDg&oe=63B776B5'
                  }
                  className="rounded-[50%]"
                  alt=""
                />
              </Button>
            </div>
          </AppTippy>
        </div>
      </HeadlessTippy>
    </div>
  );
}
