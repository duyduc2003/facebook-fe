import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { routes } from '@/utils/constants/common';
import Region from '../../components/Region';
import SidebarItem from '../../SidebarItem';
import { getUsers } from '@/services/user';
import { UserModel } from '@/interfaces/auth';

interface SidebarRightProps {}

export default function SidebarRight(props: SidebarRightProps) {
  const {} = props;

  const [pending, setPending] = useState<boolean>(false);
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    (async () => {
      setPending(true);
      const { data, isError } = await getUsers();
      if (!isError && data) setUsers(data);
      setPending(false);
    })();
  }, []);

  return (
    <div className="mt-[16px] pr-[8px]">
      <Region className="mt-4" title="Người liên hệ">
        {pending ? (
          <>
            <Skeleton height={40} className="rounded-[12px]" count={5} />
          </>
        ) : (
          <>
            {users.map((item) => (
              <SidebarItem
                key={`${item.id}`}
                avatar={item.avatar}
                title={`${item.firstName} ${item.lastName}`}
                href={`/${item.id}`}
              />
            ))}
          </>
        )}
      </Region>
    </div>
  );
}
