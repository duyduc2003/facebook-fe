import Button, { TypeOnClickBtn } from 'components/Button';
import { IconSeen } from 'components/icon';
import React from 'react';
/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';

interface MessageItemProps {
  nickname?: string;
  lastName: string;
  firstName: string;
  avatar: string;
  body: string;
  statusSend: 'iSend' | 'youSend';
  statusSeen: 'seen' | 'notSeen';
  onClick?: TypeOnClickBtn;
}

export default function MessageItem(props: MessageItemProps) {
  const {
    nickname = '',
    lastName = '',
    firstName = '',
    avatar = '',
    body = '',
    statusSend = 'iSend',
    statusSeen = 'notSeen',
    onClick,
  } = props;

  const iSend_NotSeen = statusSend === 'iSend' && statusSeen === 'notSeen';
  const iSend_Seen = statusSend === 'iSend' && statusSeen === 'seen';
  const youSend_NotSeen = statusSend === 'youSend' && statusSeen === 'notSeen';
  const youSend_Seen = statusSend === 'youSend' && statusSeen === 'seen';

  return (
    <Button
      overlay
      rounded="8px"
      className="mx-[8px] p-[8px] flex items-center overflow-hidden"
      onClick={onClick}
    >
      <div className="min-w-[56px] w-[56px] h-[56px] rounded-[50%] overflow-hidden mr-[12px]">
        <img src={avatar} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="flex-1">
        <p className="text-left mb-[8px] whitespace-nowrap truncate text-primaryText text-[14px] font-[400] leading-[18.6px] break-words select-none ">
          <span
            className={classNames(
              'truncate break-words w-[calc(360px_-_150px)] block',
              youSend_NotSeen && 'font-[500]'
            )}
          >
            {nickname ? nickname : `${firstName} ${lastName}`}
          </span>
        </p>
        <p className="text-left text-secondaryText text-[12px] font-[400] leading-[14.7px] flex items-center truncate select-none">
          {statusSend === 'iSend' && <span className="mr-1">Bạn: </span>}
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
          <div className="w-[16px] h-[16px] rounded-[50%] overflow-hidden mr-[8px]">
            <img src={avatar} alt="" className="w-full h-full object-contain" />
          </div>
        )}
      </div>
    </Button>
  );
}
