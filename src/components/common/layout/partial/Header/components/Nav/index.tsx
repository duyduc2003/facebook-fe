import React from 'react';

import {
  IconBookmarkFill,
  IconHouse,
  IconHouseActive,
  IconPeopleGroupFill,
  IconPeopleGroup,
  IconBookmark,
} from 'components/icon';
import { routes } from 'utils/constants/common';
import LinkActive from './LinkActive';

interface NavProps {}

export default function Nav(props: NavProps) {
  const {} = props;

  return (
    <div className="flex justify-center z-[101]">
      <LinkActive
        href={routes.HOME}
        content="Trang chủ"
        icon={<IconHouse />}
        iconActive={<IconHouseActive />}
        className="md:flex hidden"
      />
      {/* <LinkActive
        href={routes.GROUP}
        content="Nhóm"
        icon={<IconPeopleGroup />}
        iconActive={<IconPeopleGroupFill />}
        className="md:flex hidden"
      /> */}
      <LinkActive
        href={routes.BOOKMARKS}
        content="Xem thêm"
        icon={<IconBookmark />}
        iconActive={<IconBookmarkFill />}
        className="custom_lg:hidden"
      />
    </div>
  );
}
