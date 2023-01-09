import React from 'react';

import borderHeaderIMG from 'assets/image/borderHeader.png';
import Search from './components/Search';
import Action from './components/ActionHeader';
import Nav from './components/Nav';
import LinkActive from './components/Nav/LinkActive';
import { routes } from 'utils/constants/common';
import { IconBookmark, IconBookmarkFill } from 'components/icon';

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const {} = props;

  return (
    <div className="flex h-heightHeader text-primaryText z-[99999] fixed top-0 left-0 right-0 bg-white">
      <div className="flex justify-between w-full relative !z-[100]">
        <div className="h-full flex items-center justify-between">
          <Search />
          <LinkActive
            href={routes.BOOKMARKS}
            content="Xem thêm"
            icon={<IconBookmark />}
            iconActive={<IconBookmarkFill />}
            className="block md:hidden ml-2"
          />
        </div>
        <div className="mr-[16px]">
          <Action />
        </div>
      </div>
      <div className="absolute top-0 right-0 left-0 bottom-0">
        <div className="h-full pl-[110px] pr-[110px]">
          <div className="md:flex hidden justify-center h-full">
            <Nav />
          </div>
        </div>
      </div>
      <div
        className={`absolute right-0 left-0 bottom-[-6px] bg-[length:1px_7px] bg-repeat-x h-[7px] pointer-events-none`}
        style={{ backgroundImage: `url(${borderHeaderIMG.src})` }}
      />
    </div>
  );
}
