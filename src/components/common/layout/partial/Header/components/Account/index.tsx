/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import Button from 'components/Button';
import { IconLogout, IconSetting } from 'components/icon';
import AppTippy, { HeadlessTippy, WrapPopper } from 'components/Popper';
import { routes } from 'utils/constants/common';
import fakeData from 'utils/constants/fakeData';

import { useAuth } from 'context/AuthContext';
import Link from 'next/link';
const Image = dynamic(() => import('components/Image'), { ssr: false });

interface AccountProps {}

export default function Account(props: AccountProps) {
  const {} = props;
  const [showAccount, setShowAccount] = useState(false);

  const { currentUser, logout } = useAuth();

  const router = useRouter();

  const handleToggleOpen = () => {
    setShowAccount(!showAccount);
  };

  const handleClose = () => {
    setShowAccount(false);
  };

  const handleLogOut = () => {
    logout();
  };

  const render = (attr: any) => (
    <WrapPopper
      {...attr}
      className="py-[8px] px-[8px] w-[320px] rounded-[8px] shadow-[rgba(0,0,0,0.2)_0px_3px_10px] max-w-[320px]"
    >
      <div className="">
        <Link href={`/${currentUser?.id}`}>
          <Button
            rounded="8px"
            overlay
            className="w-full p-[8px] flex items-center"
            onClick={handleClose}
          >
            <div className="min-w-[36px] w-[36px] h-[36px] mr-[12px]">
              <Image
                src={currentUser?.avatar || ''}
                alt=""
                className="w-full h-full rounded-[50%]"
                rounded
              />
            </div>
            <div className="text-primaryText text-[15px] font-[500] break-words select-none ">
              {`${currentUser?.firstName} ${currentUser?.lastName}` || ''}
            </div>
          </Button>
        </Link>
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
                  src={currentUser?.avatar || ''}
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
