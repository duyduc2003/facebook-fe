import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';

import Button from '@/components/Button';

interface RegionProps {
  title: string;
  href?: string;
  seeAll?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function Region(props: RegionProps) {
  const { title, href = '', seeAll, children, className } = props;

  return (
    <div className={classNames('relative', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-secondaryText text-[16px] font-[500] break-words">
            {title}
          </p>
        </div>
        <div>
          {seeAll && (
            <Link href={href}>
              <Button className="text-[13px] text-accent">Xem tất cả</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="py-3">{children}</div>
      <div className="bg-divider absolute h-[1px] left-[4px] right-[4px] bottom-[-1px]"></div>
    </div>
  );
}
