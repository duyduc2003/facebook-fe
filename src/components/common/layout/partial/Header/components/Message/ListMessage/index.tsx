import React from 'react';
import MessageItem from './MessageItem';

interface ListMessageProps {}

export default function ListMessage(props: ListMessageProps) {
  const {} = props;

  return (
    <div className="mt-[16px] flex flex-col overflow-x-hidden">
      <MessageItem
        avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/313408735_1540215866453503_8961852904959079097_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6CFvmPl72wkAX873xwk&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBuGK_tsrFKpmZjwCJp_KbkdjPa2klUIYHSEH43OSlZKA&oe=63B69931"
        firstName="Phạm Thị"
        lastName="Trà My"
        nickname="Yêu nè"
        statusSeen="notSeen"
        statusSend="youSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
      <MessageItem
        avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/313408735_1540215866453503_8961852904959079097_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6CFvmPl72wkAX873xwk&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBuGK_tsrFKpmZjwCJp_KbkdjPa2klUIYHSEH43OSlZKA&oe=63B69931"
        firstName="Phạm Thị"
        lastName="Trà My"
        nickname="Yêu nè"
        statusSeen="seen"
        statusSend="youSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
      <MessageItem
        avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/313408735_1540215866453503_8961852904959079097_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6CFvmPl72wkAX873xwk&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBuGK_tsrFKpmZjwCJp_KbkdjPa2klUIYHSEH43OSlZKA&oe=63B69931"
        firstName="Phạm Thị"
        lastName="Trà My"
        nickname="Yêu nè"
        statusSeen="notSeen"
        statusSend="iSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
      <MessageItem
        avatar="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/313408735_1540215866453503_8961852904959079097_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6CFvmPl72wkAX873xwk&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBuGK_tsrFKpmZjwCJp_KbkdjPa2klUIYHSEH43OSlZKA&oe=63B69931"
        firstName="Phạm Thị"
        lastName="Trà My"
        nickname="Yêu nè"
        statusSeen="seen"
        statusSend="iSend"
        body="opihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfhopihsfiphspfh"
      />
    </div>
  );
}
