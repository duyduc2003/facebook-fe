import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  overlay?: boolean;
  rounded?: boolean | string;
  active?: boolean;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    overlay = false,
    rounded = false,
    active = false,
    onClick,
  } = props;

  let borderRadius = '';

  if (rounded) {
    if (typeof rounded === 'boolean') borderRadius = '50%';
    else borderRadius = rounded;
  }

  return (
    <button
      onClick={onClick}
      className={classNames(
        'relative ',
        active && '!bg-primaryDeemphasizedButtonBackground text-accent',
        className
      )}
      style={{ borderRadius: borderRadius }}
    >
      {children}
      {overlay && (
        <div
          className="absolute hover:bg-hoverOverlay transition-all duration-150 ease-linear top-0 left-0 bottom-0 right-0 z-[10]"
          style={{ borderRadius: borderRadius }}
        />
      )}
    </button>
  );
}
