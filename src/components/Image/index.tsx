/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import placeholderImg from 'assets/image/placeholderImg.png';
import { useBrowserLayoutEffect } from 'Hooks/useBrowserLayoutEffect';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  rounded?: boolean | string;
  fallback?: string;
}

export default function Image(props: ImageProps) {
  const {
    src,
    alt,
    className,
    rounded = false,
    fallback = placeholderImg.src,
  } = props;

  const [source, setSource] = useState(src || fallback);

  const _style: { [a: string]: any } = {};
  let _class = '';

  if (rounded) {
    if (typeof rounded === 'boolean') {
      _style.borderRadius = '50%';
      _class = 'w-full h-full object-contain';
    } else _style.borderRadius = rounded;
  }

  const handleImgError = () => {
    setSource(fallback);
  };

  useBrowserLayoutEffect(() => {
    setSource(src);
  }, [src]);

  return (
    <img
      className={classNames(
        rounded && typeof rounded === 'boolean' && _class,
        className
      )}
      src={source}
      alt={alt}
      style={{ ..._style }}
      onError={handleImgError}
    />
  );
}
