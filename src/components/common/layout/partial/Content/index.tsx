import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface ContentProps {
  children: ReactNode;
  size?: 'sm' | 'md';
}

export default function Content(props: ContentProps) {
  const { children, size = 'md' } = props;

  return (
    <div className="flex flex-1 justify-center mt-[16px] overflow-hidden">
      <div
        className={classNames(
          '',
          size === 'sm'
            ? '!max-w-[590px] w-[590px]'
            : '!max-w-[740px] w-[740px]'
        )}
      >
        {children}
      </div>
    </div>
  );
}
