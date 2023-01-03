import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface SidebarProps {
  children: ReactNode;
  className?: string;
  position?: 'left' | 'right';
  size?: 'sm' | 'md';
}

export default function Sidebar(props: SidebarProps) {
  const { children, className, position = 'left', size = 'md' } = props;

  return (
    <div
      className={classNames(
        'min-h-[calc(100vh_-_56px)] w-full relative',
        size === 'sm' ? 'max-w-[280px]' : 'max-w-[360px]',
        className
      )}
    >
      <div
        className={classNames(
          'fixed top-[56px] bottom-0 w-full overflow-y-auto',
          position && position === 'left' ? 'left-0' : 'right-0',
          size === 'sm' ? 'max-w-[280px]' : 'max-w-[360px]'
        )}
      >
        {children}
      </div>
    </div>
  );
}
