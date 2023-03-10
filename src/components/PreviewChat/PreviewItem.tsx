/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import classNames from 'classnames';

import Button, { TypeOnClickBtn } from '@/components/Button';
import { IconSeen } from '@/components/icon';
import Image from '@/components/Image';
import Link from 'next/link';
import { routes } from '@/utils/constants/common';
import { ID } from '@/interfaces/common';
import { UserModel } from '../../interfaces/auth';
import { useEffect } from 'react';
import { useAsync } from 'hooks-react-custom';
import { getUserByID } from '@/services/user';
import SkeletonPreviewChat from '../SkeletonLoading/SkeletonPreviewChat';

interface PreviewItemProps {
  body: string;
  statusSend?: 'iSend' | 'youSend';
  statusSeen?: 'seen' | 'notSeen';
  id: ID;
  friendID: ID;
  onClick?: TypeOnClickBtn;
}

export default function PreviewItem(props: PreviewItemProps) {
  const {
    friendID,
    body = '',
    statusSend = 'iSend',
    statusSeen = 'seen',
    id,
    onClick,
  } = props;

  const iSend_NotSeen = statusSend === 'iSend' && statusSeen === 'notSeen';
  const iSend_Seen = statusSend === 'iSend' && statusSeen === 'seen';
  const youSend_NotSeen = statusSend === 'youSend' && statusSeen === 'notSeen';
  const youSend_Seen = statusSend === 'youSend' && statusSeen === 'seen';

  const [friend, setFriend] = useState<UserModel>();

  const { execute, status, value } = useAsync(
    async () => await getUserByID(`${friendID}`),
    { immediate: false }
  );

  useEffect(() => {
    if (status === 'idle') execute();
    else if (status === 'success') setFriend(value?.data);
  }, [status]);

  if (status === 'success')
    return (
      <Link href={`${routes.MESSENGER}/${id}`}>
        <Button
          target="a"
          overlay
          rounded="8px"
          className="mx-[8px] p-[8px] flex items-center overflow-hidden"
          onClick={onClick}
        >
          <div className="min-w-[56px] w-[56px] h-[56px] mr-[12px]">
            <Image src={friend?.avatar || ''} alt="" className="" rounded />
          </div>
          <div className="flex-1">
            <p className="text-left mb-[8px] whitespace-nowrap truncate text-primaryText text-[14px] font-[400] leading-[18.6px] break-words select-none ">
              <span
                className={classNames(
                  'truncate break-words w-[calc(360px_-_150px)] block',
                  youSend_NotSeen && 'font-[500]'
                )}
              >
                {friend?.firstName} {friend?.lastName}
              </span>
            </p>
            <p className="text-left text-secondaryText text-[12px] font-[400] leading-[14.7px] flex items-center truncate select-none">
              {statusSend === 'iSend' && <span className="mr-1">B???n: </span>}
              <span
                className={classNames(
                  'truncate break-words max-w-[calc(360px_-_180px)] block',
                  youSend_NotSeen && 'text-accent font-[500]'
                )}
              >
                {body}
              </span>
            </p>
          </div>
          <div>
            {youSend_NotSeen && (
              <div className="bg-accent w-[12px] h-[12px] rounded-[50%] mr-[8px]"></div>
            )}
            {iSend_NotSeen && (
              <span className="fill-disabledIcon mr-[10px] flex items-center">
                <IconSeen />
              </span>
            )}
            {iSend_Seen && (
              <div className="w-[16px] h-[16px] mr-[8px]">
                <Image src={friend?.avatar || ''} alt="" rounded />
              </div>
            )}
          </div>
        </Button>
      </Link>
    );

  return (
    <div>
      <SkeletonPreviewChat />
    </div>
  );
}
