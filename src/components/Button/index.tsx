import classNames from 'classnames';
import React, { memo, ReactNode, useEffect, useState } from 'react';

export type TypeOnClickBtn = (
  event?: React.MouseEvent<
    HTMLButtonElement | HTMLDivElement | HTMLLinkElement,
    MouseEvent
  >
) => void;

interface ButtonProps {
  target?: 'div' | 'button' | 'a';
  className?: string;
  overlay?: boolean;
  rounded?: boolean | string;
  active?: boolean;
  children?: ReactNode;
  center?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: TypeOnClickBtn;
}

export default memo(function Button(props: ButtonProps) {
  const {
    children,
    className,
    overlay = false,
    rounded = false,
    active = false,
    center = false,
    disabled,
    target = 'button',
    type = 'button',
    onClick,
  } = props;

  let Comp: any = target;

  const styleWithOverlay: { [a: string]: any } = {};

  if (rounded) {
    if (typeof rounded === 'boolean') styleWithOverlay.borderRadius = '50%';
    else styleWithOverlay.borderRadius = rounded;
  }

  return (
    <Comp
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'relative ',
        active && '!bg-primaryDeemphasizedButtonBackground text-accent',
        center && 'flex items-center justify-center',
        disabled && 'opacity-50',
        className
      )}
      style={{ ...styleWithOverlay }}
      type={type}
    >
      {children}
      {overlay && (
        <div
          className="absolute hover:bg-hoverOverlay transition-all duration-150 ease-linear top-0 left-0 bottom-0 right-0 z-[10]"
          style={{ ...styleWithOverlay }}
        />
      )}
    </Comp>
  );
});
