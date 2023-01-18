import { onValue, ref } from 'firebase/database';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { database } from '@/appFirebase';
import useLocalStorage from '@/hooks/useLocalStorage';
import { AuthModel, UserModel } from '@/interfaces/auth';
import { ServiceResult } from '@/interfaces/common';
import { getUserDetail, registerUser } from '@/services/auth';
import { LOCAL_REDIRECT_PATH, routes } from '@/utils/constants/common';
import * as authHelper from '@/utils/helper/AuthHelper';

interface AuthContextState {
  auth: AuthModel | undefined;
  currentUser: UserModel | undefined;
  saveAuth: any;
  saveUser: any;
  logout: any;
  handleRedirectLogin: () => void;
}

const authContextState: AuthContextState = {
  auth: authHelper.getAuth(),
  currentUser: undefined,
  saveAuth: null,
  saveUser: null,
  logout: null,
  handleRedirectLogin() {
    console.log('Empty');
  },
};

const AuthContext = createContext<AuthContextState>(authContextState);

const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [, setRedirectPath] = useLocalStorage(LOCAL_REDIRECT_PATH, '');

  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>(
    authHelper.getUser()
  );

  const saveAuth = useCallback((authData: AuthModel | undefined) => {
    setAuth(authData);
    if (authData) {
      authHelper.setAuth(authData);
    } else {
      authHelper.removeAuth();
    }
  }, []);

  const saveUser = useCallback(async (userData: UserModel | undefined) => {
    setCurrentUser(userData);
    if (userData) {
      authHelper.setUser(userData);
    } else {
      authHelper.removeUser();
    }
  }, []);

  const logout = useCallback(() => {
    router.push(routes.AUTH.LOGIN);
    saveAuth(undefined);
    saveUser(undefined);
  }, []);

  const handleRedirectLogin = useCallback(() => {
    if (window !== undefined) {
      if (router?.pathname && router?.pathname !== routes.AUTH.LOGIN) {
        setRedirectPath(router.asPath);
      }
    }
    if (!currentUser) {
      router.push(routes.AUTH.LOGIN);
    }
  }, [currentUser]);

  const values: AuthContextState = useMemo(
    () => ({
      auth,
      currentUser,
      saveAuth,
      saveUser,
      logout,
      handleRedirectLogin,
    }),
    [auth, currentUser]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function AuthInit({ children }: AuthProviderProps) {
  const { auth, logout, saveUser, currentUser } = useAuth();

  const requestUser = async (token: string) => {
    try {
      const { data, isError } = (await getUserDetail(
        token
      )) as ServiceResult<UserModel>;
      if (!isError && data) {
        saveUser(data);
      }
    } catch (error) {
      console.error('getUserDetail Error>>', error);
      if (logout && auth?.api_token) logout();
    }
  };

  useEffect(() => {
    (async () => {
      if (auth && auth?.api_token) {
        await requestUser(auth?.api_token);
      } else if (logout && auth?.api_token) {
        logout();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return <>{children}</>;
}

export { AuthProvider, useAuth, AuthInit };
