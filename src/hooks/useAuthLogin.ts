import { useAuth } from 'context/AuthContext';
import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { routes } from 'utils/constants/common';

export default function useAuthLogin() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleRedirectLogin = useCallback(() => {
    if (!currentUser) router.push(routes.AUTH.LOGIN);
  }, [currentUser, router]);

  useIsomorphicLayoutEffect(() => {
    if (!currentUser) router.push(routes.AUTH.LOGIN);
  }, []);
}
