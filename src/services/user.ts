import { firestore } from 'appFirebase';
import { doc, getDoc } from 'firebase/firestore';
import { ID } from 'interfaces/common';
import { UserModel } from '../interfaces/auth';
import { ServiceResult } from '../interfaces/common';

export const getUserByID = async (id: ID) => {
  try {
    const docRef = doc(firestore, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { email, firstName, lastName, gender, avatar } =
        docSnap.data() as UserModel;
      return {
        isError: false,
        data: { email, firstName, lastName, gender, avatar, id: docSnap.id },
        message: '',
      } as ServiceResult<UserModel>;
    } else
      return {
        isError: true,
        data: undefined,
        message: '',
      } as ServiceResult<UserModel>;
  } catch (error) {
    console.log('🚀 ~ file: user.ts:7 ~ getUserByID ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: '',
  } as ServiceResult<UserModel>;
};
