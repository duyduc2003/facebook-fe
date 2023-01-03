import Button from 'components/Button';
import {
  Icon9Dot,
  IconBook,
  IconPeopleGroupSmall,
  IconPlus,
  IconPost,
} from 'components/icon';
import AppTippy, { HeadlessTippy, WrapPopper } from 'components/Popper';
import React, { useState } from 'react';
import MenuItem, { MenuItemProps } from './MenuItem';

const menuItem: MenuItemProps[] = [
  {
    link: '#',
    title: 'Đăng',
    description: 'Chia sẻ bài viết trên Bảng tin.',
    icon: <IconPost />,
  },
  {
    link: '#',
    title: 'Tin',
    description: 'Bạn có thể chia sẻ ảnh hoặc viết gì đó.',
    icon: <IconBook />,
    horizontal: true,
  },
  {
    link: '#',
    title: 'Nhóm',
    description: 'Kết nối với những người cùng chung sở thích.',
    icon: <IconPeopleGroupSmall />,
  },
];

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickOutside = () => {
    setShowMenu(false);
  };

  const render = (attr: any) => (
    <WrapPopper
      className="py-[8px] px-[8px] w-[360px] rounded-[8px] shadow-[rgba(0,0,0,0.2)_0px_3px_10px] max-w-[calc(100vw_-_24px)] overflow-y-auto"
      {...attr}
    >
      <div className="font-[700] text-[24px] mb-[8px] px-[8px] select-none">
        Tạo
      </div>
      <div>
        {menuItem.map(({ title, description, icon, link, horizontal }, key) => (
          <div key={`${key}-${title}`}>
            <MenuItem
              link={link}
              title={title}
              description={description}
              icon={icon}
            />
            {horizontal && <hr className="m-[8px]" />}
          </div>
        ))}
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
