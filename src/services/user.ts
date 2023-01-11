import { firestore } from 'appFirebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
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

export const searchUser = async (searchKey: string) => {
  try {
    const usersRef = collection(firestore, 'users');
    const queryFirstName = query(
      usersRef,
      where('firstName', 'array-contains', searchKey)
    );
    const queryLastName = query(
      usersRef,
      where('lastName', 'array-contains', searchKey)
    );
    const snapshotFirstName = await getDocs(queryFirstName);
    const snapshotLastName = await getDocs(queryLastName);
    console.log(123);

    if (!snapshotFirstName.empty || !snapshotLastName.empty) {
      const users = snapshotFirstName.docs;
      console.log('🚀 ~ file: user.ts:53 ~ searchUser ~ users', users);
    }
  } catch (error) {
    console.log('🚀 ~ file: user.ts:40 ~ searchUser ~ error', error);
  }
};
