import classNames from 'classnames';
import React, { useState } from 'react';

import AccountSearch from 'components/AccountSearch';
import Button from 'components/Button';
import { IconArrowLeft, IconSearch } from 'components/icon';
import { HeadlessTippy, WrapPopper } from 'components/Popper';

interface SearchMessageProps {}

export default function SearchMessage(props: SearchMessageProps) {
  const {} = props;

  const [showSearchMess, setShowSearchMess] = useState(false);

  const handleInputFocus = () => {
    setShowSearchMess(true);
  };

  const handleCloseSearch = () => {
    setShowSearchMess(false);
  };

  const render = (attr: any) => (
    <WrapPopper
      {...attr}
      className="shadow-[0px_24px_29px_-7px_rgb(100_100_111_/_20%)] max-w-[calc(100vw_-_24px)] w-[360px] h-[60vh] !z-[99] rounded-[8px] overflow-y-auto"
    >
      <div className="flex flex-col py-[16px] px-[8px]">
        <AccountSearch />
        <AccountSearch />
        <AccountSearch />
        <AccountSearch />
        <AccountSearch />
        <AccountSearch />
        <AccountSearch />
      </div>
    </WrapPopper>
  );

  return (
    <div className="mx-[8px]">
      <HeadlessTippy
        onClickOutside={handleCloseSearch}
        visible={showSearchMess}
        placement="bottom"
        render={render}
      >
        <div className="flex items-center">
          {showSearchMess && (
            <Button
              rounded
              overlay
              className="w-[36px] h-[36px] mr-[16px] flex items-center justify-center transition-all duration-150 ease-linear"
              onClick={handleCloseSearch}
            >
              <IconArrowLeft />
            </Button>
          )}
          <div className="flex flex-1 items-center transition-all duration-150 ease-linear bg-commentBackground h-[36px] rounded-[50px]">
            <div
              className={classNames(
                'flex items-center h-full text-secondaryIcon ml-[12px] transition-all duration-150 ease-linear',
                showSearchMess && '-translate-x-[10px] opacity-0 !ml-0'
              )}
            >
              <IconSearch />
            </div>
            <div className="h-full flex-1 w-full">
              <input
                type="text"
                className="bg-transparent font-[400] text-[15px] w-full h-full outline-none pl-[8px] pr-[16px] transition-all duration-300 ease-linear text-primaryText"
                placeholder="Tìm kiếm trên Messenger"
                onFocus={handleInputFocus}
              />
            </div>
          </div>
        </div>
      </HeadlessTippy>
    </div>
  );
}
