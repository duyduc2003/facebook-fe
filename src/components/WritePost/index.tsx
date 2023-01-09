/* eslint-disable @next/next/no-img-element */
import Button, { TypeOnClickBtn } from 'components/Button';
import { IconImage } from 'components/icon';
import dynamic from 'next/dynamic';
const Image = dynamic(() => import('components/Image'), { ssr: false });
import WrapPost from 'components/WrapPost';
import fakeData from 'utils/constants/fakeData';
import React, { ReactNode, useCallback, useState } from 'react';
import Popup from './Popup';
import { useAuth } from 'context/AuthContext';

interface WritePostProps {}

export default function WritePost(props: WritePostProps) {
  const {} = props;

  const [showPopup, setShowPopup] = useState(false);
  const [openWithPostImg, setOpenWithPostImg] = useState(false);

  const { currentUser, handleRedirectLogin } = useAuth();

  const handleClickInput = () => {
    handleRedirectLogin();
    setOpenWithPostImg(false);
    setShowPopup(true);
  };

  const handleClickPostWithImage = () => {
    setOpenWithPostImg(true);
    setShowPopup(true);
  };

  const setVisible = useCallback(
    (visible: boolean) => setShowPopup(visible),
    []
  );

  return (
    <WrapPost>
      <div className="pt-[12px] px-4">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] mr-4">
            <Image
              src={currentUser?.avatar || ''}
              alt=""
              className="w-full h-full rounded-[50%]"
              rounded
            />
          </div>
          <div className="flex-1">
            <Button
              overlay
              rounded="50px"
              className="h-[40px] bg-commentBackground w-full"
              onClick={handleClickInput}
            >
              <input
                type="text"
                placeholder="Đức, bạn đang nghĩ gì thế?"
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
}
