import React from 'react';
import NotificationItem from './NotificationItem';

interface ListNotificationProps {}

export default function ListNotification(props: ListNotificationProps) {
  const {} = props;

  return (
    <div className="mt-[16px] flex flex-col overflow-x-hidden">
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
    </div>
  );
}
