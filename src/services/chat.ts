import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { firestore } from '@/appFirebase';
import { PreviewChatModal } from '@/interfaces/chat';
import { ID, ServiceResult } from '@/interfaces/common';
import timestamp from '@/utils/helper/timestamp';
import { ChatModal } from '../interfaces/chat';

export const createPreviewChat = async (data: PreviewChatModal) => {
  try {
    const body: PreviewChatModal = {
      ...data,
      timestamp: timestamp(),
    };
    const previewRef = collection(firestore, 'chats');
    const result = await addDoc(previewRef, body);
    return {
      isError: true,
      data: result.id,
    } as const;
  } catch (error) {
    console.log('🚀 ~ file: chat.ts:22 ~ createPreviewChat ~ error', error);
  }
};

export const updatePreviewChat = async (data: PreviewChatModal) => {};

export const getChatRealTime = (
  chatID: ID,
  callback: ({ isError = true }: ServiceResult<ChatModal[]>) => void
) => {
  const previewRef = doc(firestore, 'chats', chatID);
  const unsubscribe = onSnapshot(previewRef, (querySnapshot) => {
    callback({
      isError: false,
      data: querySnapshot.data()?.chats,
    });
  });

  return { unsubscribe } as const;
};

export const getChatsByCurrentUser = (
  id: ID,
  callback: ({
    isError = true,
  }: ServiceResult<PreviewChatModal[] | undefined>) => void
) => {
  const previewRef = collection(firestore, 'chats');
  const q = query(
    previewRef,
    where('users_id', 'array-contains', id),
    orderBy('timestamp', 'desc')
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const preview: PreviewChatModal[] = [];

    for (const doc of querySnapshot.docs) {
      preview.push({
        ...(doc.data() as PreviewChatModal),
        id: doc.id,
      });
    }

    callback({
      isError: false,
      data: preview,
    });
  });

  return { unsubscribe } as const;
};

export const sendChat = async (chatID: ID, data: ChatModal) => {
  try {
    const body: ChatModal = {
      ...data,
      timestamp: timestamp(),
    };
    const ref = doc(firestore, 'chats', chatID);
    await updateDoc(ref, {
      chats: arrayUnion(body),
      preview_chat: body.message,
    });
  } catch (error) {
    console.log('🚀 ~ file: chat.ts:74 ~ sendChat ~ error', error);
  }
};

export const getChatDetailByID = async (id: ID) => {
  try {
    const docRef = doc(firestore, 'chats', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const doc = docSnap.data() as PreviewChatModal;
      return {
        isError: false,
        data: {
          ...doc,
          id: docSnap.id,
        } as PreviewChatModal,
        message: '',
      } as const;
    }
  } catch (error) {
    console.log('🚀 ~ file: chat.ts:89 ~ getChatDetailByID ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: '',
  } as const;
};
