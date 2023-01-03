import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthState {
  currentAuth: any;
  facebookSignIn: () => any;
  googleSignIn: () => any;
  logOut: () => any;
}

const initAuthState: AuthState = {
  currentAuth: null,
  googleSignIn: () => console.log('Do not have method'),
  facebookSignIn: () => console.log('Do not have method'),
  logOut: () => console.log('Do not have method'),
};

const AuthContext = createContext<AuthState>(initAuthState);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentAuth, setCurrentAuth] = useState<any>();

  const { Provider } = AuthContext;

  const googleSignIn = useCallback(() => {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  }, []);

  const facebookSignIn = useCallback(() => {
    const provider = new FacebookAuthProvider();
    return signInWithRedirect(auth, provider);
  }, []);

  const logOut = useCallback(() => {
    signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_currentAuth) => {
      setCurrentAuth(_currentAuth);
    });

    return () => unsubscribe();
  }, []);

  const values: AuthState = {
    currentAuth,
    googleSignIn,
    facebookSignIn,
    logOut,
  };

  return <Provider value={values || {}}>{children}</Provider>;
};
