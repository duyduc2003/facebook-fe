import classNames from 'classnames';
import React, { memo } from 'react';

interface InputProps {
  id?: string;
  className?: string;
  register?: any;
  errors?: any;
  name?: string;
  type?: 'text' | 'password' | 'image' | 'file' | 'radio';
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default memo(function Input(props: InputProps) {
  const {
    errors,
    register,
    id,
    checked,
    className,
    name,
    type = 'text',
    value,
    placeholder,
    disabled = false,
    defaultChecked,
    onChange,
  } = props;

  return (
    <div className="flex flex-col">
      <input
        defaultChecked={defaultChecked}
        autoComplete="off"
        className={classNames('outline-none border', className)}
        {...register?.(name)}
        name={name}
        id={id}
        checked={checked}
        type={type === 'image' ? 'file' : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        accept={type === 'image' ? 'image/*' : undefined}
        disabled={disabled}
      />
      {!disabled && errors && errors?.message && (
        <span className="text-xs mt-1 text-rose-500">{errors?.message}</span>
      )}
    </div>
  );
});
