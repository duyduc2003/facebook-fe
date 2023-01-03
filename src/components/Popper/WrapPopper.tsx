import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface WrapPopperProps {
  children: ReactNode;
  className?: string;
  [a: string]: any;
}

export default function WrapPopper(props: WrapPopperProps) {
  const { children, className, ..._props } = props;

  return (
    <div
      className={classNames(
        'bg-white max-h-[min(100vh_-_96px_-_60px,734px)]',
        className
      )}
      {..._props}
    >
      {children}
    </div>
  );
}
