import Button from 'components/Button';
import Image from 'components/Image';
import Input from 'components/Input';
import Modal from 'components/Modal';
import { useAsync, useToggle } from 'hooks-react-custom';
import React, { useCallback, useEffect, useState } from 'react';
import { UserModel } from 'interfaces/auth';
import { uploadImage } from 'services/image';
import { toastAlert } from '../ToastAlert/index';
import { IconLoading } from 'components/icon';
import { updateAvatarUser } from '../../services/user';

interface EditProfileProps {
  user?: UserModel;
}

function EditProfile(props: EditProfileProps) {
  const { user } = props;

  const [visible, setToggleVisible] = useToggle();

  const [inputFile, setInputFile] = useState<any>();
  const [previewImg, setPreviewImg] = useState<any>(user?.avatar);
  const [pending, setPending] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        setInputFile(undefined);
        return;
      }
      // I've kept this example simple by using the first image instead of multiple
      setInputFile(e.target.files[0]);
    },
    []
  );
  const handleResetAvatar = useCallback(() => {
    setPreviewImg(user?.avatar);
  }, []);

  const handleClickSave = useCallback(async () => {
    setPending(true);
    if (inputFile && user?.id) {
      const { imageUrl } = await uploadImage({
        type: 'avatar',
        file: inputFile,
      });

      await updateAvatarUser(user?.id, imageUrl || user.avatar || '')
        .then(() => {
          toastAlert({
            type: 'success',
            message: 'Thay ảnh đại diện thành công',
          });
        })
        .catch((e) => {
          console.log('🚀 ~ file: index.tsx:62 ~ handleClickSave ~ e', e);
          toastAlert({
            type: 'error',
            message: 'Thay ảnh đại diện không thành công',
          });
        });
    }
    setPending(false);
    setToggleVisible();
  }, [inputFile, user?.avatar, user?.id]);

  useEffect(() => {
    if (!inputFile) {
      setPreviewImg(user?.avatar);
      return;
    }

    const objectUrl = URL.createObjectURL(inputFile);
    setPreviewImg(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [inputFile]);

  return (
    <div>
      <Button
        secondary
        overlay
        rounded="8px"
        center
        className="p-[6px_10px] text-[15px] font-[500]"
        onClick={setToggleVisible}
      >
        Chỉnh sửa
      </Button>
      <Modal
        visible={visible}
        btnClose
        onClickBtnClose={setToggleVisible}
        onClickOverlay={setToggleVisible}
        className="w-auto pr-10"
      >
        <div className="p-5">
          <h2 className="text-[20px] font-[600] mb-5">
            Chỉnh sửa ảnh đại diện
          </h2>
          <div>
            <div className="shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] max-w-[300px] rounded-[8px] overflow-hidden">
              <Image src={previewImg} alt="" className="w-full" />
            </div>
            <div className="mt-3 flex gap-2">
              <label
                htmlFor="uploadAvt"
                className="inline-block cursor-pointer"
              >
                <Button
                  primary
                  center
                  overlay
                  rounded="8px"
                  className="text-[15px] p-[6px_8px] pointer-events-none"
                >
                  Chọn ảnh
                </Button>
                <Input
                  id="uploadAvt"
                  type="image"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
              <Button
                secondary
                center
                overlay
                rounded="8px"
                className="text-[15px] p-[6px_8px]"
                onClick={handleResetAvatar}
              >
                Xóa
              </Button>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              primary
              center
              overlay
              disabled={pending}
              rounded="8px"
              className="text-[15px] p-[6px_8px]"
              onClick={handleClickSave}
            >
              Lưu
              {pending && (
                <div className="w-3 h-3 ml-2">
                  <IconLoading />
                </div>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfile;
