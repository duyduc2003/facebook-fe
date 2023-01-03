import React, { useId, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { IconArrowLeft, IconFB, IconSearch } from 'components/icon';
import { HeadlessTippy } from 'components/Popper';
import WrapPopper from 'components/Popper/WrapPopper';
import Button from 'components/Button';
import { routes } from 'constants/common';

import styles from './search.module.scss';
import AccountSearch from 'components/AccountSearch';

const cx = classNames.bind(styles);

interface SearchProps {}

export default function Search(props: SearchProps) {
  const {} = props;

  const [showPopperSearch, setShowPopperSearch] = useState<boolean>(false);

  const inputID = useId();

  const handleInputFocus = () => {
    setShowPopperSearch(true);
  };

  const handleCloseSearch = () => {
    setShowPopperSearch(false);
  };

  const render = (attr: any) => (
    <WrapPopper
      {...attr}
      className={cx(
        'z-[9999999999999999999] -translate-x-[5px] rounded-b-[8px] w-[320px]',
        styles.shadowWrapPopper
      )}
    >
      <div className="py-[16px] px-[8px] flex flex-col text-left">
        <AccountSearch iconClose />
        <AccountSearch iconClose />
        <AccountSearch iconClose />
        <AccountSearch iconClose />
      </div>
    </WrapPopper>
  );

  return (
    <div className="flex">
      <Link
        href={routes.HOME}
        className="ml-[16px] mr-[8px] xl:mr-[16px] flex items-center"
      >
        <IconFB />
      </Link>
      <HeadlessTippy
        placement="bottom"
        visible={showPopperSearch}
        offset={[0, -1]}
        onClickOutside={handleCloseSearch}
        render={render}
      >
        <div
          className={cx(
            showPopperSearch &&
              cx(
                'absolute top-0 left-0 w-[320px] transition-all duration-150 ease-linear !z-[9999]',
                styles.searchWrap
              ),
            'flex items-center h-heightHeader bg-white rounded-tr-[8px]'
          )}
        >
          <div
            className={cx(
              showPopperSearch ? 'block ml-[16px] mr-[16px]' : 'hidden'
            )}
          >
            <Button
              overlay
              rounded
              onClick={handleCloseSearch}
              className="w-[40px] h-[40px] flex justify-center items-center rounded-[50px]"
            >
              <IconArrowLeft />
            </Button>
          </div>
          <div
            className={cx(
              'relative flex items-center justify-center min-h-[40px] min-w-[40px] w-[40px] xl:w-[240px] rounded-[50px] bg-commentBackground',
              showPopperSearch && '!w-[240px]'
            )}
          >
            <label
              htmlFor={inputID}
              className={cx(
                'xl:ml-[16px] cursor-pointer text-secondaryIcon transition-all duration-150 ease-linear xl:relative absolute top-1/2 xl:top-auto xl:left-auto xl:translate-x-0 xl:translate-y-0 -translate-x-1/2 -translate-y-1/2',
                showPopperSearch
                  ? '!-translate-x-[8px] opacity-0 !ml-0'
                  : 'translate-x-[0] opacity-100'
              )}
            >
              <IconSearch />
            </label>
            <div className="flex-1">
              <input
                id={inputID}
                type="text"
                className={cx(
                  'bg-transparent text-[15px] w-[0px] xl:w-full h-full outline-none pl-[8px] pr-[16px] transition-all duration-300 ease-linear text-primaryText',
                  showPopperSearch &&
                    '!w-full pl-[16px] xl:pl-[8px] pointer-events-none'
                )}
                autoComplete="off"
                placeholder="Tìm kiếm trên Facebook"
                onFocus={handleInputFocus}
              />
            </div>
          </div>
        </div>
      </HeadlessTippy>
    </div>
  );
}
