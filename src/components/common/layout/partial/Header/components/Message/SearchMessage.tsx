import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useAsync, useDebounce, useInput } from 'hooks-react-custom';

import AccountSearch from '@/components/AccountSearch';
import Button from '@/components/Button';
import { IconArrowLeft, IconLoading, IconSearch } from '@/components/icon';
import { HeadlessTippy, WrapPopper } from '@/components/Popper';
import { UserModel } from '@/interfaces/auth';
import { getUsers } from '@/services/user';

interface SearchMessageProps {}

export default function SearchMessage(props: SearchMessageProps) {
  const {} = props;

  const [showSearchMess, setShowSearchMess] = useState(false);
  const { execute, error, status, value } = useAsync(getUsers);
  const [pending, setPending] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<UserModel[]>([]);

  const { value: valueInput, eventBind } = useInput('');

  const { debouncedValue, isPending } = useDebounce<string>(valueInput);

  const accountsResult: UserModel[] = useMemo(
    () =>
      accounts.filter(
        (acc) =>
          acc.firstName
            ?.toLowerCase()
            .includes(debouncedValue?.toLowerCase()) ||
          acc.lastName?.toLowerCase().includes(debouncedValue?.toLowerCase()) ||
          acc.email?.toLowerCase().includes(debouncedValue?.toLowerCase())
      ),
    [debouncedValue]
  );

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
        {pending || isPending ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-4 h-4">
              <IconLoading />
            </div>
          </div>
        ) : (
          <>
            {accountsResult.map(({ avatar, firstName, lastName, id }) => (
              <AccountSearch
                avatar={avatar || ''}
                fullName={`${firstName || ''} ${lastName || ''}`}
                link={`/${id}`}
                key={id}
                onClick={handleCloseSearch}
              />
            ))}
          </>
        )}
      </div>
    </WrapPopper>
  );

  useEffect(() => {
    if (status === 'pending') {
      setPending(true);
    } else if (status === 'success') {
      setAccounts(value?.data || []);
      setPending(false);
    }
  }, [status]);

  return (
    <div className="mx-[8px]">
      <HeadlessTippy
        onClickOutside={handleCloseSearch}
        visible={showSearchMess}
        placement="bottom"
        render={render}
        onMount={execute}
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
                {...eventBind}
              />
            </div>
          </div>
        </div>
      </HeadlessTippy>
    </div>
  );
}
