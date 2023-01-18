import classNames from 'classnames';
import React, { memo, ReactNode, useEffect, useState } from 'react';

export type TypeEventClick = React.MouseEvent<
  HTMLButtonElement | HTMLDivElement | HTMLLinkElement,
  MouseEvent
>;

export type TypeOnClickBtn = (event?: TypeEventClick) => void;

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
  primary?: boolean;
  secondary?: boolean;
  onClick?: TypeOnClickBtn;
}

function Button(props: ButtonProps, ref: any) {
  const {
    children,
    className,
    overlay = false,
    rounded = false,
    active = false,
    center = false,
    primary = false,
    secondary = false,
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
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'relative ',
        active && '!bg-primaryDeemphasizedButtonBackground text-accent',
        center && 'flex items-center justify-center',
        disabled && 'opacity-50',
        primary && 'bg-primaryButtonBackground text-white',
        secondary && 'bg-secondaryButtonBackground text-primaryText',
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
}

export default memo(React.forwardRef(Button));
