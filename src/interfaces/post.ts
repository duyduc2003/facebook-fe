import { ID } from './common';

export interface PostModal {
  id?: ID;
  userID: ID;
  userAvatar?: string;
  userName?: string;
  imageUrl?: string | null;
  body: string | null;
  timestamp?: string;
}
