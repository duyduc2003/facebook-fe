import { firestore } from 'appFirebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { ID } from 'interfaces/common';
import { UserModel } from '../interfaces/auth';
import { ServiceResult } from '../interfaces/common';

export const updateAvatarUser = async (userID: ID, urlAvatar: string) => {
  console.log(
    '🚀 ~ file: user.ts:16 ~ updateAvatarUser ~ urlAvatar',
    urlAvatar
  );
  try {
    const ref = doc(firestore, 'users', userID);
    await updateDoc(ref, {
      avatar: urlAvatar,
    });
  } catch (error) {
    console.log('🚀 ~ file: user.ts:19 ~ updateAvatarUser ~ error', error);
  }
};

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

export const searchUser = async () => {
  try {
    const usersRef = collection(firestore, 'users');
    const queryUser = query(usersRef);

    const snapshotUser = await getDocs(queryUser);

    let users: UserModel[] = [];
    if (!snapshotUser.empty) {
      snapshotUser.forEach((item) => {
        item.exists() &&
          users.push({
            ...(item.data() as UserModel),
            id: item.id,
          });
      });
    }

    return {
      isError: false,
      data: users,
      message: '',
    } as const;
  } catch (error) {
    console.log('🚀 ~ file: user.ts:40 ~ searchUser ~ error', error);
  }

  return {
    isError: true,
    data: [] as UserModel[],
    message: "Can't load user",
  } as const;
};
