import React, { useEffect, useState } from 'react';
import fakeData from '@/utils/constants/fakeData';
import PreviewItem from './PreviewItem';
import { useAuth } from '@/context/AuthContext';
import { useAsync, useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { getChatsByCurrentUser } from '@/services/chat';
import { PreviewChatModal } from '@/interfaces/chat';
import { UserModel } from '@/interfaces/auth';

interface PreviewChatProps {}

export default function PreviewChat(props: PreviewChatProps) {
  const {} = props;

  const { currentUser } = useAuth();

  const [previews, setPreviews] = useState<PreviewChatModal[]>([]);

  useIsomorphicLayoutEffect(() => {
    const { unsubscribe } = getChatsByCurrentUser(
      currentUser?.id || '',
      ({ isError, data }) => {
        if (!isError && data) setPreviews(data);
      }
    );

    return () => unsubscribe();
  }, [currentUser?.id]);

  return (
    <div className="mt-[16px] flex flex-col overflow-x-hidden">
      {previews.map((item, i) => {
        const friend = item.users.find((item) => item.id !== currentUser?.id);
        return (
          <PreviewItem
            id={item.id || ''}
            key={`${item.id}-${i}`}
            avatar={friend?.avatar || ''}
            fullName={`${friend?.firstName} ${friend?.lastName}`}
            statusSeen="seen"
            statusSend="youSend"
            body={item.preview_chat || ''}
          />
        );
      })}
    </div>
  );
}
