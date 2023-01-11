import { ID } from './common';

export interface PreviewChatModal {
  id?: ID;
  chat_id?: ID;
  user_id: ID;
  friend_id: ID;
  friend_avatar: string;
  friend_full_name: string;
  status_send: 'iSend' | 'youSend';
  status_seen: 'seen' | 'notSeen';
  preview_chat: string;
}

export interface ChatModal {
  userID: ID;
  avatar: string;
  image?: string;
  chat?: string;
  id?: ID;
  timestamp?: string;
}
