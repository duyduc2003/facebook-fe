import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface WrapPostProps {
  children: ReactNode;
  className?: string;
}

export default function WrapPost(props: WrapPostProps) {
  const { children, className } = props;

  return (
    <div
      className={classNames(
        'bg-white shadow-[rgba(0,0,0,0.16)_0px_1px_4px] py-3 rounded-[8px] relative',
        className
      )}
    >
      {children}
    </div>
  );
}
