import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import Input from 'components/Input';
import Button from 'components/Button';
import ModalPopup from 'components/Modal';
import WrapPost from 'components/WrapPost';
import { IconFacebookLarge } from 'components/icon';
import Body from 'components/common/layout/partial/Body';
import RegisterForm from 'components/auth/RegisterForm';
import LoginForm from 'components/auth/LoginForm';

export default function Login() {
  const [showModalRegister, setModalRegister] = useState(false);

  const router = useRouter();

  const onClickToggleModalRegister = useCallback(() => {
    setModalRegister(!showModalRegister);
  }, [showModalRegister]);

  return (
    <>
      <Head>
        <title>Facebook Login</title>
      </Head>
      <Body className="bg-webWash max-h-screen h-screen w-screen">
        <div className="flex items-center justify-center w-full">
          <div>
            <IconFacebookLarge />

            <WrapPost>
              <div className="px-4 flex flex-col">
                <LoginForm />
                <hr className="my-5" />
                <div className="flex justify-center mb-3">
                  <Button
                    onClick={onClickToggleModalRegister}
                    overlay
                    rounded="6px"
                    className="bg-[#42b72a] text-white font-[500] px-[16px] text-[17px] leading-[48px]"
                  >
                    Tạo tài khoản mới
                  </Button>
                </div>
              </div>
            </WrapPost>
          </div>
        </div>
        <ModalPopup
          btnClose
          visible={showModalRegister}
          onClickBtnClose={onClickToggleModalRegister}
          onClickOverlay={onClickToggleModalRegister}
        >
          <RegisterForm />
        </ModalPopup>
      </Body>
    </>
  );
}
