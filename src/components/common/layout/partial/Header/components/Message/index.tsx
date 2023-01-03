import React, { useState } from 'react';
import classNames from 'classnames';

import AppTippy, { HeadlessTippy, WrapPopper } from 'components/Popper';
import {
  Icon3Dot,
  IconMessage,
  IconOpenMessage,
  IconPostSmall,
} from 'components/icon';
import Button from 'components/Button';
import ListMessage from './ListMessage';
import SearchMessage from './SearchMessage';
import styles from './message.module.scss';

interface indexProps {}

export default function Message(props: indexProps) {
  const {} = props;
  const [showMess, setShowMess] = useState(false);

  const handleClickOutSide = () => {
    setShowMess(false);
  };

  const render = (attr: any) => (
    <WrapPopper
      className="py-[8px] px-[8px] w-[360px] rounded-[8px] shadow-[rgba(0,0,0,0.2)_0px_3px_10px] max-w-[calc(100vw_-_24px)] overflow-y-auto"
      {...attr}
    >
      <div className="font-[700] text-[24px] mb-[8px] px-[8px] select-none flex items-center justify-between">
        <div>Chat</div>
        <div>
          <Button
            rounded
            overlay
            className={classNames(
              'w-[32px] h-[32px] text-secondaryText',
              styles.filterImg
            )}
          >
            <Icon3Dot />
          </Button>
          <Button
            rounded
            overlay
            className={classNames(
              'w-[32px] h-[32px] text-secondaryText',
              styles.filterImg
            )}
          >
            <IconOpenMessage />
          </Button>
          <Button
            rounded
            overlay
            className={classNames(
              'w-[32px] h-[32px] text-secondaryText',
              styles.filterImg
            )}
          >
            <IconPostSmall />
          </Button>
        </div>
      </div>
      <div>
        <SearchMessage />
        <ListMessage />
      </div>
    </WrapPopper>
  );

  return (
    <div>
      <HeadlessTippy
        visible={showMess}
        onClickOutside={handleClickOutSide}
        render={render}
        placement="bottom"
        offset={[-15, 5]}
      >
        <div>
          <AppTippy content="Message">
            <div>
              <Button
                rounded
                overlay
                active={showMess}
                className="flex items-center justify-center bg-secondaryButtonBackground w-[40px] h-[40px] ml-[8px]"
                onClick={() => setShowMess(!showMess)}
              >
                <IconMessage />
              </Button>
            </div>
          </AppTippy>
        </div>
      </HeadlessTippy>
    </div>
  );
}
