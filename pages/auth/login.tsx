import Head from 'next/head';
import React, { useCallback, useEffect } from 'react';

import Button from 'components/Button';
import MainLayout from 'components/common/layout/MainLayout';
import Body from 'components/common/layout/partial/Body';
import WrapPost from 'components/WrapPost';
import { useAuth } from 'context/auth';
import { useRouter } from 'next/router';
import { routes } from 'constants/common';

interface LoginProps {}

export default function Login(props: LoginProps) {
  const {} = props;

  const { googleSignIn, facebookSignIn, currentAuth } = useAuth();

  const route = useRouter();

  const handleLoginByGoogle = useCallback(async () => {
    try {
      const a = await googleSignIn();
      console.log('🚀 ~ file: login.tsx:24 ~ handleLoginByGoogle ~ a', a);
    } catch (error) {
      console.log(
        '🚀 ~ file: login.tsx:21 ~ handleLoginByGoogle ~ error',
        error
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLoginByFB = useCallback(async () => {
    try {
      const a = await facebookSignIn();
      console.log('🚀 ~ file: login.tsx:24 ~ facebookSignIn ~ a', a);
    } catch (error) {
      console.log('🚀 ~ file: login.tsx:21 ~ facebookSignIn ~ error', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentAuth !== null) route.push(routes.HOME);
  }, [currentAuth]);

  return (
    <>
      <Head>
        <title>Facebook Login</title>
      </Head>
      <Body className="bg-webWash max-h-screen h-screen w-screen">
        <div className="flex items-center justify-center w-full">
          <div>
            <WrapPost>
              <div className="flex flex-col">
                <Button
                  className="bg-primaryButtonBackground text-white text-[14px] font-[500] h-[40px] px-[12px] mx-4"
                  rounded="8px"
                  overlay
                  onClick={handleLoginByFB}
                >
                  Đăng nhập với Facebook
                </Button>
                <Button
                  className="mt-4 bg-white text-primaryText border text-[14px] font-[500] h-[40px] px-[12px] mx-4"
                  rounded="8px"
                  overlay
                  onClick={handleLoginByGoogle}
                >
                  Đăng nhập với Google
                </Button>
              </div>
            </WrapPost>
          </div>
        </div>
      </Body>
    </>
  );
}
