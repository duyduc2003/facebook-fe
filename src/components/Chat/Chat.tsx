import { useAuth } from 'context/AuthContext';
import React from 'react';
import ChatItem from './ChatItem';

interface ChatProps {}

function Chat(props: ChatProps) {
  const {} = props;
  const { currentUser } = useAuth();

  return (
    <div className='className="mt-10 pb-[100px]'>
      <div>
        <ChatItem userID={''} avatar="" chat="haha" image="1" />
        <ChatItem
          userID={currentUser?.id || ''}
          avatar=""
          chat="XIn chào"
          image="1"
        />
        <ChatItem userID={''} avatar="" chat="" image="" />
        <ChatItem userID={currentUser?.id || ''} avatar="" chat="" image="" />
      </div>
    </div>
  );
}

export default Chat;
