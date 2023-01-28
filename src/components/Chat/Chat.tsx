import React, { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { ID } from '@/interfaces/common';
import {
  useAsync,
  useScrollToElement,
  useScrollPosition,
  useIsInViewport,
  useIsFirstRender,
  usePrevious,
} from 'hooks-react-custom';
import { getChatRealTime } from '@/services/chat';
import dynamic from 'next/dynamic';
import { ChatModal } from '@/interfaces/chat';
import Button from '../Button';
import classNames from 'classnames';
import { UserModel } from '@/interfaces/auth';

const ChatItem = dynamic(() => import('./ChatItem'), { ssr: false });

interface ChatProps {
  chatID: ID;
  friendData?: UserModel;
}

function Chat(props: ChatProps) {
  const { chatID, friendData } = props;
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<ChatModal[]>([]);

  const [bottomRef, scroll] = useScrollToElement<HTMLDivElement>();

  useEffect(() => {
    const { unsubscribe } = getChatRealTime(chatID, ({ data }) => {
      const chatsData = data?.sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp)
      );
      setChats(chatsData || []);
    });

    return () => unsubscribe();
  }, [chatID]);

  useEffect(() => {
    scroll({ behavior: 'smooth' });
  }, [chats, scroll]);

  return (
    <div className="mt-10 pb-[100px] relative">
      <div className="overflow-y-scroll">
        {chats.map((item, i) => (
          <ChatItem
            key={`${item.id}-${item.sender_id}-${i}`}
            userID={`${item.sender_id}`}
            avatar={friendData?.avatar || ''}
            chat={item.message}
            image=""
          />
        ))}

        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}

export default Chat;
