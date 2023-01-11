import { firestore } from 'appFirebase';
import { addDoc, collection } from 'firebase/firestore';
import { ChatModal } from 'interfaces/chat';
import { ServiceResult } from 'interfaces/common';
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
