import classNames from 'classnames';
import React, { useRef } from 'react';
import { useScrollPosition, useScrollToTop } from 'hooks-react-custom';

import Button from '@/components/Button';
import { IconArrowTop } from '@/components/icon';

function TopPage() {
  const position = useScrollPosition();
  const { scrollToTop } = useScrollToTop();

  return (
    <Button
      primary
      center
      overlay
      rounded="6px"
      onClick={scrollToTop}
      className={classNames(
        '!fixed bottom-1 right-5 w-10 h-10 opacity-100 transition-all duration-150 ease-linear -translate-y-5',
        position < 300 && 'opacity-0 pointer-events-none -translate-y-0'
      )}
    >
      <IconArrowTop />
    </Button>
  );
}

export default TopPage;
