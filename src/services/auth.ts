import md5 from 'md5';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { database, firestore, storage } from '@/appFirebase';
import { AuthModel, UserModel, LoginModal } from '@/interfaces/auth';
import { ServiceResult } from '@/interfaces/common';
import { defaultData } from '@/utils/constants/common';

export const loginUser = async (data: LoginModal) => {
  try {
    const hashPassword = md5(data.password);
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('email', '==', data.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const [user] = snapshot.docs;
      if (!user.exists()) {
        return {
          isError: true,
          data: undefined,
          message: 'Tài khoản không tồn tại',
        } as ServiceResult<UserModel>;
      } else if (user.exists() && user.data()?.password === hashPassword) {
        const { email, firstName, gender, lastName, avatar } =
          user.data() as UserModel;
        return {
          isError: false,
          data: { id: user.id, email, firstName, gender, lastName, avatar },
          message: 'Đăng nhập thành công.',
        } as ServiceResult<UserModel>;
      } else {
        return {
          isError: true,
          data: undefined,
          message: 'Tài khoản hoặc mật khẩu không đúng.',
        } as ServiceResult<UserModel>;
      }
    }
  } catch (error) {
    console.log('🚀 ~ file: auth.ts:27 ~ loginUser ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: 'Something wrong!',
  } as ServiceResult<UserModel>;
};

export const registerUser = async (user: UserModel | undefined) => {
  if (user)
    try {
      const data: UserModel = {
        avatar: defaultData.avatar,
        ...user,
        password: md5(user.password || 'default'),
      };
      const result = await addDoc(collection(firestore, '/users/'), data);
      if (result)
        return {
          isError: false,
          data: result.id,
          message: 'Đăng ký thành công!',
        } as ServiceResult<string>;
      else
        return {
          isError: true,
          data: undefined,
          message: 'Đăng ký không thành công!',
        } as ServiceResult<string>;
    } catch (error) {
      console.log(' ~ file: auth.ts:10 ~ registerUser ~ error', error);
    }

  return {
    isError: true,
    data: undefined,
    message: 'Đăng ký không thành công!',
  } as ServiceResult<string>;
};

export const getUserDetail = async (token: string) => {
  try {
    const docRef = doc(firestore, 'users', token);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { email, firstName, gender, lastName, avatar } =
        docSnap.data() as UserModel;
      return {
        isError: false,
        data: { id: docSnap.id, email, firstName, gender, lastName, avatar },
        message: '',
      } as ServiceResult<UserModel>;
    } else {
      return {
        isError: true,
        data: undefined,
        message: '',
      } as ServiceResult<UserModel>;
    }
  } catch (error) {
    console.log('🚀 ~ file: auth.ts:100 ~ getUserDetail ~ error', error);
  }
  return {
    isError: true,
    data: undefined,
    message: '',
  } as ServiceResult<UserModel>;
};
