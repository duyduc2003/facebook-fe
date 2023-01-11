import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import Button from 'components/Button';
import {
  Icon9Dot,
  IconBook,
  IconPeopleGroupSmall,
  IconPlus,
  IconPost,
} from 'components/icon';
import AppTippy, { HeadlessTippy, WrapPopper } from 'components/Popper';

import MenuItem, { MenuItemProps } from './MenuItem';
import { routes } from 'utils/constants/common';
import { actions } from 'components/WritePost/writePostState';
import { useAuth } from 'context/AuthContext';
import { useAppDispatch } from 'hooks/redux';

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  const { handleRedirectLogin } = useAuth();
  const dispatch = useAppDispatch();

  const handleClickOutside = () => {
    setShowMenu(false);
  };

  const menuItem: MenuItemProps[] = useMemo(
    () => [
      {
        title: 'Đăng',
        description: 'Chia sẻ bài viết trên Bảng tin.',
        icon: <IconPost />,
        onClick: () => {
          handleRedirectLogin();
          if (router.pathname !== routes.HOME) router.push(routes.HOME);
          dispatch(actions.showPopupWritePost(true));
          setShowMenu(false);
        },
        // horizontal: true,
      },
      // {
      //   link: '#',
      //   title: 'Tin',
      //   description: 'Bạn có thể chia sẻ ảnh hoặc viết gì đó.',
      //   icon: <IconBook />,
      // },
      // {
      //   link: '#',
      //   title: 'Nhóm',
      //   description: 'Kết nối với những người cùng chung sở thích.',
      //   icon: <IconPeopleGroupSmall />,
      // },
    ],
    []
  );

  const render = (attr: any) => (
    <WrapPopper
      className="py-[8px] px-[8px] w-[360px] rounded-[8px] shadow-[rgba(0,0,0,0.2)_0px_3px_10px] max-w-[calc(100vw_-_24px)] overflow-y-auto"
      {...attr}
    >
      <div className="font-[700] text-[24px] mb-[8px] px-[8px] select-none">
        Tạo
      </div>
      <div>
        {menuItem.map(
          ({ title, description, icon, link, horizontal, onClick }, key) => (
            <div key={`${key}-${title}`}>
              <MenuItem
                link={link}
                title={title}
                description={description}
                icon={icon}
                onClick={onClick}
              />
              {horizontal && <hr className="m-[8px]" />}
            </div>
          )
        )}
      </div>
    </WrapPopper>
  );

  return (
    <div>
      <HeadlessTippy
        visible={showMenu}
        render={render}
        onClickOutside={handleClickOutside}
        offset={[-15, 5]}
      >
        <div>
          <AppTippy content="Menu">
            <div>
              <Button
                rounded
                overlay
                active={showMenu}
                className="flex items-center justify-center bg-secondaryButtonBackground w-[40px] h-[40px] ml-[8px]"
                onClick={() => setShowMenu(!showMenu)}
              >
                <span className="hidden custom_lg:block">
                  <Icon9Dot />
                </span>
                <span className="custom_lg:hidden block">
                  <IconPlus />
                </span>
              </Button>
            </div>
          </AppTippy>
        </div>
      </HeadlessTippy>
    </div>
  );
}
