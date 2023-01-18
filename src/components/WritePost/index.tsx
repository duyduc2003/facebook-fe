/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useKeyPressHandler } from 'hooks-react-custom';
import { useRouter } from 'next/router';

import Button, { TypeOnClickBtn } from '@/components/Button';
import { IconImage } from '@/components/icon';
import WrapPost from '@/components/WrapPost';
import Popup from './Popup';
import { useAuth } from '@/context/AuthContext';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { routes } from '@/utils/constants/common';
import { selectors, actions } from './writePostState';

const Image = dynamic(() => import('@/components/Image'), { ssr: false });

export default memo(function WritePost() {
  const isShowPopup = useAppSelector(selectors.selectIsShowPopupWritePost);
  const dispatch = useAppDispatch();

  const [showPopup, setShowPopup] = useState(isShowPopup);
  const [openWithPostImg, setOpenWithPostImg] = useState(false);

  const { currentUser, handleRedirectLogin } = useAuth();

  useKeyPressHandler('h', (e) => {
    handleRedirectLogin();
    if (currentUser) setShowPopup(true);
  });
  useKeyPressHandler('esc', (e) => {
    setShowPopup(false);
  });

  const handleClickInput = () => {
    handleRedirectLogin();
    if (currentUser) {
      setOpenWithPostImg(false);
      setShowPopup(true);
    }
  };

  const handleClickPostWithImage = () => {
    handleRedirectLogin();
    if (currentUser) {
      setOpenWithPostImg(true);
      setShowPopup(true);
    }
  };

  const setVisible = useCallback((visible: boolean) => {
    setShowPopup(visible);
  }, []);

  useEffect(() => {
    dispatch(actions.showPopupWritePost(showPopup));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup]);

  useEffect(() => {
    setShowPopup(isShowPopup);
  }, [isShowPopup]);

  return (
    <WrapPost>
      <div className="pt-[12px] px-4">
        <div className="flex items-center">
          {currentUser && (
            <div className="w-[40px] h-[40px] mr-4">
              <Image
                src={currentUser?.avatar || ''}
                alt=""
                className="w-full h-full rounded-[50%]"
                rounded
              />
            </div>
          )}
          <div className="flex-1">
            <Button
              overlay
              rounded="50px"
              className="h-[40px] bg-commentBackground w-full"
              onClick={handleClickInput}
            >
              <input
                type="text"
                placeholder={
                  currentUser
                    ? `${currentUser?.lastName}, bạn đang nghĩ gì thế?`
                    : 'Đăng nhập để có thể đăng bài.'
                }
                className="bg-transparent w-full h-full px-4"
              />
            </Button>
          </div>
        </div>
        <div className="mt-4 py-1 border-t">
          <Button
            rounded="8px"
            overlay
            className="px-[12px] py-2 flex items-center"
            onClick={handleClickPostWithImage}
          >
            <div className="">
              <IconImage />
            </div>
            <div className="ml-2 text-secondaryText text-[14px] font-[500]">
              Ảnh
            </div>
          </Button>
        </div>
        <Popup
          visible={showPopup}
          setVisible={setVisible}
          openWithImage={openWithPostImg}
        />
      </div>
    </WrapPost>
  );
});
