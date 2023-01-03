import React, { Children, ReactNode } from 'react';
import classNames from 'classnames';

interface BodyProps {
  children: ReactNode;
  className?: string;
}

export default function Body(props: BodyProps) {
  const { children, className } = props;

  return <div className={classNames('flex', className)}>{children}</div>;
}
