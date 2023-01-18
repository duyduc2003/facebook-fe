import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { firestore } from '@/appFirebase';
import { ChatModal } from '@/interfaces/chat';
import { ID, ServiceResult } from '@/interfaces/common';
import { PreviewChatModal } from '@/interfaces/chat';
import timestamp from '@/utils/helper/timestamp';

export const createPreviewChat = async (data: PreviewChatModal) => {
  try {
    const result = await getPreviewChatByUserIDAndFriendID(
      data.user_id || '',
      data.friend_id || ''
    );

    if (result) {
      const body: PreviewChatModal = {
        status_seen: 'notSeen',
        status_send: 'iSend',
        timestamp: timestamp(),
      };
      const ref = doc(firestore, 'previewChat', result.id || '');
      await updateDoc(ref, {
        ...body,
      });
    } else {
      const body: PreviewChatModal = {
        ...data,
        timestamp: timestamp(),
      };
    }
  } catch (error) {
    console.log('🚀 ~ file: chat.ts:12 ~ createPreviewChat ~ error', error);
  }
};

const getPreviewChatByUserIDAndFriendID = async (
  user_id: ID,
  friend_id: ID
): Promise<PreviewChatModal | undefined> => {
  try {
    const previewChatRef = collection(firestore, 'previewChat');
    const q = query(
      previewChatRef,
      where('user_id', '==', user_id),
      where('friend_id', '==', friend_id),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const [previewChat] = querySnapshot.docs;
      if (previewChat.exists())
        return {
          ...previewChat.data(),
          id: previewChat.id,
        } as PreviewChatModal;
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: chat.ts:23 ~ getPreviewChatByUserIDAndFriendID ~ error',
      error
    );
  }

  return undefined;
};

export const sendChat = async (data: ChatModal) => {
  try {
    const body: ChatModal = {
      ...data,
      timestamp: JSON.stringify(Date.now()),
    };
    const chatCollection = collection(firestore, '/messenger/');
    const result = await addDoc(chatCollection, body);

    if (result)
      return {
        isError: false,
        data: result.id,
        message: '',
      } as ServiceResult<string>;
    else
      return {
        isError: true,
        data: undefined,
        message: 'Gửi tin nhắn không thành công!',
      } as ServiceResult<string>;
  } catch (error) {
    console.log('🚀 ~ file: chat.ts:6 ~ sendChat ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: 'Something wrong!',
  } as ServiceResult<string>;
};
