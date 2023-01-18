import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useToggle } from 'hooks-react-custom';
import React, { memo, useEffect, useMemo, useState } from 'react';

import WrapPost from '@/components/WrapPost';
import { ID } from '@/interfaces/common';
import getDateToTimestamp from '@/utils/helper/getDateToTimestamp';
import Button, { TypeEventClick, TypeOnClickBtn } from '@/components/Button';
import { Icon3Dot, IconLoading, IconTrash } from '@/components/icon';
import { HeadlessTippy } from '@/components/Popper';
import { deletePostByID } from '@/services/post';
import { toastAlert } from '../ToastAlert/index';
import { WrapPopper } from '../Popper';
import { useAuth } from '@/context/AuthContext';
import { routes } from '@/utils/constants/common';

const Image = dynamic(() => import('@/components/Image'), { ssr: false });

interface PostedProps {
  postID?: string;
  userID?: ID;
  avatar?: string;
  fullName: string;
  content?: string;
  timestamp?: string;
  img?: string | null;
  onClickDelete?: (e?: TypeEventClick, postID?: ID) => void;
}

function Posted(props: PostedProps) {
  const {
    postID = '',
    userID = '',
    fullName = '',
    avatar = '',
    img = '',
    content = '',
    timestamp = '',
    onClickDelete,
  } = props;

  const time = useMemo(() => {
    if (!timestamp) return '00:00';
    const { date, time } = getDateToTimestamp(timestamp);
    return `${date} ${time}`;
  }, [timestamp]);

  const { currentUser } = useAuth();
  const [pending, setPending] = useState(false);

  const handleClickDeletePost: TypeOnClickBtn = async (e) => {
    try {
      setPending(true);
      await deletePostByID(postID);
      onClickDelete?.(e, postID);
      toastAlert({ type: 'success', message: 'Xóa bài viết thành công.' });
      setPending(false);
    } catch (error) {
      console.log(
        '🚀 ~ file: Posted.tsx:80 ~ handleClickDeletePost ~ error',
        error
      );
      toastAlert({ type: 'error', message: 'Lỗi khi xóa bài viết.' });
    }
    setPending(false);
  };

  return (
    <WrapPost className="my-4">
      <div className="flex items-center justify-between">
        <div className="mx-[16px] inline-flex items-center">
          <Link
            href={`/${userID}`}
            className="min-w-[40px] w-[40px] h-[40px] mr-2"
          >
            <Image
              src={avatar || ''}
              alt={fullName}
              rounded
              className="object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <Link
              className=" text-primaryText text-[14px] font-[500]"
              href={`/${userID}`}
            >
              {fullName}
            </Link>
            <Link
              href={`${routes.POST}/${postID}`}
              className="text-[11px] text-secondaryIcon hover:underline"
            >
              {time}
            </Link>
          </div>
        </div>
        {currentUser?.id === userID && (
          <ButtonMorePost
            pending={pending}
            onClickDeletePost={handleClickDeletePost}
          />
        )}
      </div>
      <div
        className="mx-4 mt-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {img && (
        <div className="my-4 flex justify-center">
          <Image src={img} alt="" className="object-cover" />
        </div>
      )}
    </WrapPost>
  );
}

export default memo(Posted);

interface ButtonMorePostProps {
  pending: boolean;
  onClickDeletePost: TypeOnClickBtn;
}

function ButtonMorePost({ pending, onClickDeletePost }: ButtonMorePostProps) {
  const [visible, toggle] = useToggle();

  const render = (attr: any) => (
    <WrapPopper
      {...attr}
      className="shadow-[rgba(0,0,0,0.16)_0px_1px_4px] rounded-[8px] p-2"
    >
      <Button
        disabled={pending}
        overlay
        className="py-2 px-3 text-sm flex items-center gap-2"
        rounded="6px"
        onClick={onClickDeletePost}
      >
        <IconTrash />
        Xóa bài viết
        {pending && (
          <div className="flex justify-center">
            <div className="w-3 h-3">
              <IconLoading />
            </div>
          </div>
        )}
      </Button>
    </WrapPopper>
  );

  return (
    <HeadlessTippy
      visible={visible}
      placement="bottom-end"
      render={render}
      onClickOutside={toggle}
    >
      <div className="mr-4 bgImg-color-secondary">
        <Button
          onClick={toggle}
          overlay
          rounded
          center
          className="w-[28px] h-[28px]"
        >
          <Icon3Dot />
        </Button>
      </div>
    </HeadlessTippy>
  );
}
