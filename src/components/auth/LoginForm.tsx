import md5 from 'md5';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'components/Button';
import Input from 'components/Input';
import { LoginModal, UserModel } from 'interfaces/auth';
import { loginUser, registerUser } from 'services/auth';
import { IconLoading } from 'components/icon';
import { ServiceResult } from 'interfaces/common';
import { useAuth } from 'context/AuthContext';
import { toastAlert } from '../ToastAlert/index';
import useLocalStorage from 'hooks/useLocalStorage';
import { LOCAL_REDIRECT_PATH } from 'utils/constants/common';
import { routes } from '../../utils/constants/common';
import { useRouter } from 'next/router';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email không được để trống')
    .email('Trường này phải là email'),
  password: Yup.string()
    .required('Mật khẩu không được trống.')
    .min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const { saveAuth } = useAuth();
  const [redirect, , removeRedirect] = useLocalStorage(
    LOCAL_REDIRECT_PATH,
    routes.HOME
  );
  console.log('🚀 ~ file: LoginForm.tsx:37 ~ LoginForm ~ redirect', redirect);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModal>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (dataLogin: LoginModal) => {
    setLoading(true);
    try {
      const { data, isError, message } = (await loginUser(
        dataLogin
      )) as ServiceResult<UserModel>;
      if (!isError && data) {
        saveAuth({ api_token: data.id || '' });
        toastAlert({ type: 'success', message: message || '' });
        if (redirect) {
          removeRedirect();
          router.push(redirect);
        } else {
          router.push(routes.HOME);
        }
      } else {
        toastAlert({ type: 'error', message: message || '' });
      }
    } catch (error) {
      console.log('🚀 ~ file: LoginForm.tsx:45 ~ onSubmit ~ error', error);
    }
    setLoading(false);
  };

  return (
    <form
      autoComplete="off"
      className="flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          name="email"
          register={register}
          errors={errors.email}
          placeholder="Email"
          className="focus:border-primaryButtonBackground outline-none py-[14px] px-[16px] rounded-[6px] text-[17px] w-[330px] border border-[#dddfe2]"
        />
      </div>
      <div className="my-3">
        <Input
          name="password"
          placeholder="Password"
          register={register}
          errors={errors.password}
          type="password"
          className="focus:border-primaryButtonBackground outline-none py-[14px] px-[16px] rounded-[6px] text-[17px] w-[330px] border border-[#dddfe2]"
        />
      </div>
      <Button
        type="submit"
        className="w-full text-[18px] px-[16px] h-[48px] font-[400]"
        rounded="6px"
        overlay
        center
        primary
        disabled={loading}
      >
        Đăng nhập
        {loading && (
          <div className="w-4 h-4 ml-2">
            <IconLoading />
          </div>
        )}
      </Button>
    </form>
  );
}
