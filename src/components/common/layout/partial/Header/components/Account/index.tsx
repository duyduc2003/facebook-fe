/* eslint-disable @next/next/no-img-element */
import Button from 'components/Button';
import { IconLogout, IconSetting } from 'components/icon';
import Image from 'components/Image';
import AppTippy, { HeadlessTippy, WrapPopper } from 'components/Popper';
import { routes } from 'constants/common';
import { useAuth } from 'context/auth';
import { useBrowserLayoutEffect } from 'Hooks/useBrowserLayoutEffect';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface AccountProps {}

export default function Account(props: AccountProps) {
  const {} = props;
  const [showAccount, setShowAccount] = useState(false);

  const { currentAuth, logOut } = useAuth();
  const router = useRouter();

  const handleToggleOpen = () => {
    setShowAccount(!showAccount);
  };

  const handleClose = () => {
    setShowAccount(false);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:28 ~ handleLogOut ~ error', error);
    }
  };

  useBrowserLayoutEffect(() => {
    if (!currentAuth) router.push(routes.LOGIN);
  }, [currentAuth]);

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
            <Image
              src={currentAuth?.photoURL || ''}
              alt=""
              className="w-full h-full rounded-[50%]"
              rounded
            />
          </div>
          <div className="text-primaryText text-[15px] font-[500] break-words select-none ">
            {currentAuth?.displayName || ''}
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
          onClick={handleLogOut}
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
        offset={[-15, 5]}
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
                <Image
                  src={currentAuth?.photoURL || ''}
                  alt=""
                  className="w-full h-full rounded-[50%]"
                  rounded
                />
              </Button>
            </div>
          </AppTippy>
        </div>
      </HeadlessTippy>
    </div>
  );
}
