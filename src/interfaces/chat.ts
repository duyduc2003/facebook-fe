import { ID } from './common';
import { UserModel } from './auth';

export interface PreviewChatModal {
  id?: ID;
  users_id: ID[];
  preview_chat?: string;
  chats?: ChatModal[];
  timestamp?: string;
}

export interface ChatModal {
  id?: ID;
  sender_id?: ID;
  message?: string;
  image?: string | null;
  timestamp?: string;
}
