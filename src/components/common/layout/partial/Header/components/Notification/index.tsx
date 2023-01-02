import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useLayoutEffect, useState } from 'react';

import Button from 'components/Button';
import { IconBell } from 'components/icon';
import AppTippy, { HeadlessTippy, WrapPopper } from 'components/Popper';
import { routes } from 'constants/common';
import ListNotification from './ListNotification';

interface NotificationProps {}

export default function Notification(props: NotificationProps) {
  const {} = props;
  const [showNor, setShowNor] = useState(false);

  const route = useRouter();

  const handleClickOutside = () => {
    setShowNor(false);
  };

  const render = (attr: any) => (
    <WrapPopper
      className="py-[8px] px-[8px] w-[360px] rounded-[8px] shadow-[rgba(0,0,0,0.2)_0px_3px_10px] max-w-[calc(100vw_-_24px)] overflow-y-auto"
      {...attr}
    >
      <div className="font-[700] text-[24px] mb-[8px] px-[8px] select-none flex items-center justify-between">
        <div>Thông báo</div>
        <Link href={routes.NOTIFICATIONS} className="flex items-center">
          <Button
            overlay
            rounded="4px"
            className="text-accent text-[13px] font-normal p-2"
          >
            Xem tất cả
          </Button>
        </Link>
      </div>
      <div>
        <ListNotification />
      </div>
    </WrapPopper>
  );

  useLayoutEffect(() => {
    if (routes.NOTIFICATIONS === route.pathname) {
      setShowNor(true);
    } else {
      setShowNor(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.pathname]);

  return (
    <div>
      <HeadlessTippy
        onClickOutside={handleClickOutside}
        visible={showNor && routes.NOTIFICATIONS !== route.pathname}
        render={render}
      >
        <div>
          <AppTippy content="Thông báo">
            <div>
              <Button
                rounded
                overlay
                active={showNor || routes.NOTIFICATIONS === route.pathname}
                className="flex items-center justify-center bg-secondaryButtonBackground w-[40px] h-[40px] ml-[8px]"
                onClick={() => setShowNor(!showNor)}
              >
                <IconBell />
              </Button>
            </div>
          </AppTippy>
        </div>
      </HeadlessTippy>
    </div>
  );
}
