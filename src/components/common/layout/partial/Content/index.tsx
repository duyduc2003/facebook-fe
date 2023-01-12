import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface ContentProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'full';
  className?: string;
}

export default function Content(props: ContentProps) {
  const { children, size = 'md', className } = props;

  return (
    <div
      className={classNames(
        'flex flex-1 justify-center overflow-hidden',
        className
      )}
    >
      <div
        className={classNames(
          '',
          size === 'sm' && '!max-w-[590px] w-[590px]',
          size === 'md' && '!max-w-[740px] w-[740px]',
          size === 'full' && 'w-full'
        )}
      >
        {children}
      </div>
    </div>
  );
}
