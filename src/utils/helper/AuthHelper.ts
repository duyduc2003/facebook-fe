/* eslint-disable no-console */
import { AuthModel, UserModel } from 'interfaces/auth';

const AUTH_LOCAL_STORAGE_KEY = 'fb-auth';
const USER_LOCAL_STORAGE_KEY = 'fb-user';

const getAuth = (): AuthModel | undefined => {
  if (typeof window !== 'undefined') {
    if (!window.localStorage) {
      return;
    }

    const lsValue: string | null = window.localStorage.getItem(
      AUTH_LOCAL_STORAGE_KEY
    );
    if (!lsValue) {
      return;
    }

    try {
      const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
      if (!auth) {
        return;
      }
      // eslint-disable-next-line consistent-return
      return auth;
    } catch (error) {
      console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
  }
};

const setAuth = (auth: AuthModel) => {
  if (!window.localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    window.localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeAuth = () => {
  if (typeof window !== 'undefined') {
    if (!window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
    }
  }
};

const getUser = (): UserModel | undefined => {
  if (typeof window !== 'undefined') {
    if (!window.localStorage) {
      return;
    }

    const lsValue: string | null = window.localStorage.getItem(
      USER_LOCAL_STORAGE_KEY
    );
    if (!lsValue) {
      return;
    }

    try {
      const user: UserModel = JSON.parse(lsValue) as UserModel;
      if (!user) {
        return;
      }
      // eslint-disable-next-line consistent-return
      return user;
    } catch (error) {
      console.error('USER LOCAL STORAGE PARSE ERROR', error);
    }
  }
};

const setUser = (data: UserModel) => {
  if (!window.localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(data);
    window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error('USER LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeUser = () => {
  if (typeof window !== 'undefined') {
    if (!window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('USER LOCAL STORAGE REMOVE ERROR', error);
    }
  }
};

export {
  getAuth,
  setAuth,
  removeAuth,
  getUser,
  setUser,
  removeUser,
  USER_LOCAL_STORAGE_KEY,
  AUTH_LOCAL_STORAGE_KEY,
};
