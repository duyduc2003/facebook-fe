import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

interface AppTippyProps extends TippyProps {}

export default function AppTippy(props: AppTippyProps) {
  const { children, ..._props } = props;

  return (
    <Tippy
      {..._props}
      delay={[500, 200]}
      className="text-[12px]"
      arrow={false}
      placement="bottom"
    >
      {children}
    </Tippy>
  );
}
