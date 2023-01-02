import React from 'react';

import borderHeaderIMG from 'assets/image/borderHeader.png';
import Search from './components/Search';
import Action from './components/ActionHeader';
import Nav from './components/Nav';

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const {} = props;

  return (
    <div className="flex relative h-heightHeader text-primaryText z-[99999]">
      <div className="flex justify-between w-full relative !z-[100]">
        <div className="h-full flex items-center justify-between">
          <Search />
        </div>
        <div className="mr-[16px]">
          <Action />
        </div>
      </div>
      <div className="absolute top-0 right-0 left-0 bottom-0">
        <div className="h-full pl-[110px] pr-[110px]">
          <div className="flex justify-start md:justify-center h-full">
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
