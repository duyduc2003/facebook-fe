/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { useAsync, useKeyPressHandler } from 'hooks-react-custom';
import React, { memo, useCallback, useState } from 'react';

import Button from '@/components/Button';
import { IconCloseLg, IconLoading } from '@/components/icon';
import { uploadPost } from '@/services/post';
import { uploadImage } from '@/services/image';
import { useAuth } from '@/context/AuthContext';

import PostImage from './PostImage';
import { toastAlert } from '../ToastAlert/index';

const TextEditor = dynamic(() => import('@/components/TextEditor'), {
  ssr: false,
});
const Image = dynamic(() => import('@/components/Image'), { ssr: false });

interface PopupProps {
  visible: boolean;
  openWithImage?: boolean;
  setVisible: (visible: boolean) => void;
}

function Popup(props: PopupProps) {
  const { visible = false, openWithImage = false, setVisible } = props;

  const {} = useAuth();
  const [valueEditor, setValueEditor] = useState<string>();
  const [fileImage, setFileImage] = useState<any>();
  const [pendingPost, setPendingPost] = useState(false);

  const { currentUser } = useAuth();

  const handleTextEditorChange = useCallback(
    (value: string) => setValueEditor(value),
    []
  );

  const handleUploadPost = async () => {
    setPendingPost(true);
    try {
      if ((valueEditor && valueEditor !== '') || fileImage) {
        let urlImg = null;
        if (fileImage) {
          const { imageUrl } = await uploadImage({
            type: 'posts',
            file: fileImage,
          });
          urlImg = imageUrl;
        }
        const { data, isError, message } = await uploadPost({
          userID: currentUser?.id || '',
          body: valueEditor || null,
          imageUrl: urlImg,
        });
        toastAlert({
          type: !isError && data ? 'success' : 'error',
          message: message,
        });
        if (!isError && data) {
          setValueEditor('');
          setFileImage(null);
          setVisible?.(false);
        }
      } else {
        toastAlert({
          type: 'error',
          message: 'Bài viết không được để trống.',
        });
      }
    } catch (error) {
      console.log('🚀 ~ file: Popup.tsx:39 ~ handleUploadPost ~ error', error);
    }

    setPendingPost(false);
  };

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
                <Image src={currentUser?.avatar || ''} alt="" rounded />
              </div>
              <div className="text-primaryText text-[14px] font-[500]">
                {`${currentUser?.firstName || ''} ${
                  currentUser?.lastName || ''
                }`}
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <div className="mx-[16px] py-4">
                <TextEditor
                  value={valueEditor}
                  onChange={handleTextEditorChange}
                />
              </div>
              <div className="my-2 mx-4">
                <PostImage
                  file={fileImage}
                  showPostImg={openWithImage}
                  setImage={setFileImage}
                />
              </div>
            </div>
            <div className="mx-4">
              <Button
                disabled={pendingPost}
                overlay
                center
                rounded="8px"
                className="h-[36px] bg-primaryButtonBackground text-white w-full text-[14px] font-[600] px-[12px]"
                onClick={handleUploadPost}
              >
                Đăng
                {pendingPost && (
                  <div className="w-4 h-4 ml-2">
                    <IconLoading />
                  </div>
                )}
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
