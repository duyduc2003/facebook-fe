import React from 'react';
import fakeData from '@/utils/constants/fakeData';
import MessageItem from './MessageItem';

interface ListMessageProps {}

export default function ListMessage(props: ListMessageProps) {
  const {} = props;

  return (
    <div className="mt-[16px] flex flex-col overflow-x-hidden">
      <MessageItem
        avatar={fakeData.avatar}
        fullName="Phạm Thị Trà My"
        statusSeen="notSeen"
        statusSend="youSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
      <MessageItem
        avatar={fakeData.avatar}
        fullName="Phạm Thị Trà My"
        statusSeen="seen"
        statusSend="youSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
      <MessageItem
        avatar={fakeData.avatar}
        fullName="Phạm Thị Trà My"
        statusSeen="notSeen"
        statusSend="iSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
      <MessageItem
        avatar={fakeData.avatar}
        fullName="Phạm Thị Trà My"
        statusSeen="seen"
        statusSend="iSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
    </div>
  );
}
