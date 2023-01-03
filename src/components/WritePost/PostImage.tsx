import classNames from 'classnames';
import Button from 'components/Button';
import { IconClose, IconImage, IconPlus } from 'components/icon';
import Image from 'components/Image';
import React, { useEffect, useId, useRef, useState } from 'react';

interface PostImageProps {
  showPostImg?: boolean;
}

export default function PostImage(props: PostImageProps) {
  const { showPostImg = false } = props;

  const [showWrapImg, setShowWrapImg] = useState(showPostImg || false);
  const [inputFile, setInputFile] = useState<any>();
  const [previewImg, setPreviewImg] = useState<any>();

  const inputFileID = useId();

  const inputFileRef = useRef<any>();

  const handleShowWrapImg = () => {
    setShowWrapImg(true);
  };
  const handleCloseWrapImg = () => {
    setShowWrapImg(false);
    setInputFile(undefined);
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setInputFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setInputFile(e.target.files[0]);
  };

  const handleCleanPreviewImg = () => {
    setInputFile(undefined);
  };

  useEffect(() => {
    if (!inputFile) {
      setPreviewImg(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(inputFile);
    setPreviewImg(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [inputFile]);

  useEffect(() => {
    setShowWrapImg(showPostImg);
  }, [showPostImg]);

  return (
    <div className="my-4">
      <div className="flex justify-center">
        {showWrapImg && (
          <div className="border p-8 border-dashed rounded-[8px] relative">
            {previewImg && (
              <div className="max-w-[300px]">
                <Image src={previewImg} alt="" className="h-full w-full" />
              </div>
            )}
            <div
              className={classNames(
                'min-w-[200px] flex items-center justify-center w-full',
                !previewImg ? 'h-[200px]' : 'mt-4'
              )}
            >
              <div className="flex items-center">
                <label htmlFor={inputFileID} className="cursor-pointer ">
                  <Button
                    target="div"
                    rounded="8px"
                    overlay
                    center
                    className="p-[10px] bg-secondaryButtonBackground"
                  >
                    <div className="mr-[12px]">
                      <IconPlus />
                    </div>
                    <span>Chọn ảnh</span>
                  </Button>
                </label>
                {previewImg && (
                  <Button
                    rounded="8px"
                    overlay
                    center
                    className="ml-2 p-[10px] bg-secondaryButtonBackground"
                    onClick={handleCleanPreviewImg}
                  >
                    <span>Xóa</span>
                  </Button>
                )}
              </div>
              <input
                ref={inputFileRef}
                type="file"
                className="hidden"
                id={inputFileID}
                onChange={handleInputFileChange}
              />
            </div>

            <Button
              overlay
              rounded
              className="w-[32px] h-[32px] !absolute top-1 right-1 flex items-center justify-center"
              onClick={handleCloseWrapImg}
            >
              <IconClose />
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        {!showWrapImg && (
          <Button
            rounded="8px"
            overlay
            className="px-[12px] py-2 flex items-center"
            onClick={handleShowWrapImg}
          >
            <div className="">
              <IconImage />
            </div>
            <div className="ml-2 text-secondaryText text-[14px] font-[500]">
              Ảnh
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
