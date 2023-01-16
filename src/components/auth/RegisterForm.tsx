import * as Yup from 'yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'components/Button';
import Input from 'components/Input';
import { UserModel } from 'interfaces/auth';
import { registerUser } from 'services/auth';
import { IconLoading } from 'components/icon';
import { toastAlert } from '../ToastAlert/index';
import { ServiceResult } from 'interfaces/common';

interface RegisterFormProps {}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Trường này là bắt buộc'),
  lastName: Yup.string().required('Trường này là bắt buộc'),
  email: Yup.string()
    .required('Trường này là bắt buộc')
    .email('Đây không phải là Email'),
  gender: Yup.string().default('cẹc'),
  password: Yup.string()
    .required('Trường này là bắt buộc')
    .min(6, 'Mật khẩu có ít nhất 6 ký tự'),
});

export default function RegisterForm(props: RegisterFormProps) {
  const {} = props;

  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<UserModel>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitForm = async (user: UserModel) => {
    setLoading(true);
    try {
      const { isError, data, message } = (await registerUser(
        user
      )) as ServiceResult<string>;
      if (!isError && data) {
        setLoading(false);
        toastAlert({ type: 'success', message: message || '' });
        reset();
      } else {
        toastAlert({ type: 'error', message: message || '' });
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: RegisterForm.tsx:51 ~ handleSubmitForm ~ error',
        error
      );
      toastAlert({ type: 'error', message: 'Có lỗi!' });
    }
    setLoading(false);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="px-4 pt-4">
        <h3 className="text-primaryText font-[600] text-[30px] leading-[38px]">
          Đăng ký
        </h3>
        <p className="text-secondaryText font-[400] text-[15px]">
          Nhanh chóng và dễ dàng
        </p>
      </div>
      <hr className="my-4" />
      <div className="px-4 pb-4 overflow-y-auto max-h-[300px]">
        <div className="flex sm:gap-2 sm:flex-row flex-col">
          <div className="mb-4 flex-1">
            <Input
              register={register}
              name="firstName"
              errors={errors.firstName}
              placeholder="Họ"
              className="border-[#ccd0d5] text-[15px] bg-commentBackground rounded-[6px] text-primaryText w-full leading-[16px] p-[11px] "
            />
          </div>
          <div className="mb-4 sm:mb-0 flex-1">
            <Input
              register={register}
              name="lastName"
              errors={errors.lastName}
              placeholder="Tên"
              className="border-[#ccd0d5] text-[15px] bg-commentBackground rounded-[6px] text-primaryText w-full leading-[16px] p-[11px] "
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-4 flex-1">
            <Input
              register={register}
              name="email"
              errors={errors.email}
              placeholder="Email"
              className="border-[#ccd0d5] text-[15px] bg-commentBackground w-full rounded-[6px] text-primaryText  leading-[16px] p-[11px] "
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-4 flex-1">
            <Input
              register={register}
              name="password"
              errors={errors.password}
              type="password"
              placeholder="Mật khẩu"
              className="border-[#ccd0d5] text-[15px] bg-commentBackground w-full rounded-[6px] text-primaryText  leading-[16px] p-[11px] "
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-4 flex-1">
            <p className="text-[#606770] text-[12px] leading-[20px] font-normal">
              Giới tính
            </p>
            <div className="flex items-center justify-between gap-2">
              <div className="border flex-1 border-[#ccd0d5] rounded-[6px]">
                <label
                  htmlFor="sexMale"
                  className="flex items-center justify-between cursor-pointer pr-3"
                >
                  <span className="block text-[#1c1e21] text-[15px] leading-[36px] pr-[28px] pl-[10px]">
                    Nam
                  </span>
                  <Input
                    value="male"
                    id="sexMale"
                    name="gender"
                    type="radio"
                    register={register}
                    defaultChecked
                  />
                </label>
              </div>
              <div className="border flex-1 border-[#ccd0d5] rounded-[6px]">
                <label
                  htmlFor="sexFemale"
                  className="flex items-center justify-between cursor-pointer pr-3"
                >
                  <span className="block text-[#1c1e21] text-[15px] leading-[36px] pr-[28px] pl-[10px]">
                    Nữ
                  </span>
                  <Input
                    value="female"
                    id="sexFemale"
                    name="gender"
                    type="radio"
                    register={register}
                  />
                </label>
              </div>
            </div>
            {errors?.gender?.message && (
              <span className="text-xs text-rose-500">
                {errors.gender.message}
              </span>
            )}
          </div>
        </div>
        <p className="text-[#777] text-[11px] mb-3 break-words">
          Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
          của bạn lên Facebook.
        </p>
        <p className="text-[#777] text-[11px] mb-3 break-words">
          Bằng cách nhấp vào Đăng ký, bạn đồng ý với <b>Điều khoản</b>,
          <b> Chính sách quyền riêng tư</b> và <b>Chính sách cookie</b> của
          chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy
          nhận bất kỳ lúc nào.
        </p>
      </div>
      <div className="flex justify-center my-5 px-2">
        <Button
          disabled={loading}
          type="submit"
          overlay
          center
          rounded="6px"
          className="bg-[#42b72a] text-white font-[500] px-[16px] text-[17px] sm:max-w-[194px]  w-full h-[36px] "
        >
          Đăng ký
          {loading && (
            <div className="w-3 h-3 ml-2">
              <IconLoading />
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
