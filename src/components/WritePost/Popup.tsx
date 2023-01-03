/* eslint-disable @next/next/no-img-element */
import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from 'components/Button';
import { IconCloseLg, IconImage } from 'components/icon';
import Image from 'components/Image';
import MyEditor from 'components/MyEditor';
import PostImage from './PostImage';
import { useAuth } from 'context/auth';

interface PopupProps {
  visible?: boolean;
  openWithImage?: boolean;
  setVisible?: (visible: boolean) => void;
}

function Popup(props: PopupProps) {
  const { visible = false, openWithImage = false, setVisible } = props;
  const { currentAuth } = useAuth();

  const [value, setValue] = useState<string | undefined>();

  const closePopup = () => {
    setVisible?.(false);
  };

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 right-0 bottom-0 z-[99999] transition-all duration-200 ease-linear',
        !visible ? '!z-[-100]' : ''
      )}
    >
      <div className="h-full">
        <div
          className={classNames(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] w-full z-[999999] transition-all duration-200 ease-linear',
            visible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="pb-4 bg-white shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px] rounded-[8px]">
            <div className="relative w-full text-primaryText border-b text-[20px] font-[700] leading-[24px] select-none h-[60px] flex items-center justify-center">
              Tạo bài viết
              <Button
                overlay
                className="bg-commentBackground w-[36px] h-[36px] flex items-center justify-center !absolute top-1/2 -translate-y-1/2 right-4"
                rounded
                onClick={closePopup}
              >
                <IconCloseLg />
              </Button>
            </div>
            <div className="mx-4 mt-4 flex items-center">
              <div className="w-[40px] h-[40px] mr-[12px]">
                <Image src={currentAuth?.photoURL || ''} alt="" rounded />
              </div>
              <div className="text-primaryText text-[14px] font-[500]">
                {currentAuth?.displayName || ''}
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <div className="mx-[16px] py-4">
                <MyEditor setValue={setValue} />
              </div>
              <div className="my-2 mx-4">
                <PostImage showPostImg={openWithImage} />
              </div>
            </div>
            <div className="mx-4">
              <Button
                overlay
                rounded="8px"
                className="h-[36px] bg-primaryButtonBackground text-white w-full text-[14px] font-[600] px-[12px]"
              >
                Đăng
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'bg-overlayAlpha80 absolute top-0 right-0 bottom-0 left-0 transition-all duration-200 ease-linear',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={closePopup}
      ></div>
    </div>
  );
}

export default memo(Popup);
