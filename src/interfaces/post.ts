import { Timestamp } from 'firebase/firestore';
import { ID } from './common';

export interface PostModal {
  id?: ID;
  userID: ID;
  userAvatar?: string;
  userName?: string;
  imageUrl?: string | null;
  body: string;
  timestamp?: string;
}
