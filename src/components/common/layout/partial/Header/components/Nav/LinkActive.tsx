import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import Button from '@/components/Button';
import AppTippy from '@/components/Popper';

interface LinkActiveProps {
  icon: ReactNode;
  iconActive: ReactNode;
  content: string;
  href: string;
  className?: string;
}

export default function LinkActive(props: LinkActiveProps) {
  const { content, icon, iconActive, href, className } = props;

  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <AppTippy content={content}>
      <div
        className={classNames(
          'relative h-full flex flex-1 items-center',
          className
        )}
      >
        <Link href={href}>
          <Button
            rounded="8px"
            overlay={!isActive}
            className="h-[48px] max-w-[calc(15vw_-_55px)] min-w-[50px] w-[110px] flex justify-center items-center text-secondaryText"
          >
            {isActive ? (
              <span className="text-primaryButtonBackground">{iconActive}</span>
            ) : (
              icon
            )}
          </Button>
        </Link>
        {isActive && (
          <div className="absolute bg-primaryButtonBackground h-[3px] left-[2px] bottom-0 right-0 rounded-t-[1px]"></div>
        )}
      </div>
    </AppTippy>
  );
}
