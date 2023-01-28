import React, { useMemo } from 'react';
import classNames from 'classnames';

import Image from '@/components/Image';
import { useAuth } from '@/context/AuthContext';
import { ID } from '@/interfaces/common';

interface ChatItemProps {
  userID: ID;
  avatar: string;
  chat?: string;
  image?: string;
}

function ChatItem(props: ChatItemProps) {
  const { userID, avatar = '', chat = '', image = '' } = props;

  const { currentUser } = useAuth();

  const currentUserSend = useMemo(
    () => currentUser?.id === userID,
    [currentUser?.id, userID]
  );

  return (
    <div
      className={classNames(
        'flex my-5 mr-28 transition-all duration-200',
        currentUserSend && 'flex-row-reverse justify-end mr-0 ml-28'
      )}
    >
      <div className="p-[0_8px_0_14px]">
        <div className="w-[28px] h-[28px]">
          <Image
            src={(currentUserSend ? currentUser?.avatar : avatar) || ''}
            alt=""
            rounded
          />
        </div>
      </div>
      <div>
        <div
          className={classNames(
            'bg-commentBackground custom_md:!max-w-[300px] min-[1060px]:!max-w-[500px] max-w-[250px] leading-[20px] text-primaryText text-[15px] break-words p-[8px_12px] rounded-[18px]',
            currentUserSend && '!bg-primaryButtonBackground !text-white',
            !chat && image && '!bg-transparent !pt-0 mt-0'
          )}
        >
          {chat}
          {image && (
            <div className="mt-5 max-w-[300px]">
              <Image src={image} alt="w-full" />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}

export default ChatItem;
