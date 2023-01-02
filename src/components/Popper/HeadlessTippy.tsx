import React from 'react';
import { TippyProps } from '@tippyjs/react/headless';
import Headless from '@tippyjs/react/headless';

interface HeadlessTippyProps extends TippyProps {
  className?: string;
}

export default function HeadlessTippy(props: HeadlessTippyProps) {
  const { children, className, ..._props } = props;

  return (
    <Headless interactive className={className} {..._props}>
      {children}
    </Headless>
  );
}
