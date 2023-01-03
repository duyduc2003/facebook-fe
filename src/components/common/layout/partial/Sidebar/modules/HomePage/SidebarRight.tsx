import { routes } from 'constants/common';
import React from 'react';
import AccountRequest from '../../components/AccountRequest';
import Region from '../../components/Region/index';
import SidebarItem from '../../SidebarItem';

interface SidebarRightProps {}

export default function SidebarRight(props: SidebarRightProps) {
  const {} = props;

  return (
    <div className="mt-[16px] pr-[8px]">
      <Region title="Lời mời kết bạn" seeAll href={routes.FRIEND}>
        <AccountRequest
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          fullName="Lý Minh Hiếu"
        />
        <AccountRequest
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          fullName="Lý Minh Hiếu"
        />
      </Region>
      <Region className="mt-4" title="Người liên hệ">
        <SidebarItem
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          title="Đặng Duy Đức"
        />
        <SidebarItem
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          title="Đặng Duy Đức"
        />
        <SidebarItem
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          title="Đặng Duy Đức"
        />
        <SidebarItem
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          title="Đặng Duy Đức"
        />
        <SidebarItem
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          title="Đặng Duy Đức"
        />
        <SidebarItem
          avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/301302964_113778148114241_2788602441107831789_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OP6eSD2h194AX8QLIUb&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCDHwZoAmMyZVZCJ1MgbfwccK4MuTQff8LwvGjDj1rS1w&oe=63B8B374"
          title="Đặng Duy Đức"
        />
      </Region>
    </div>
  );
}
