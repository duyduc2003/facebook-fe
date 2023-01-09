import { firestore } from 'appFirebase';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { ID, ServiceResult } from 'interfaces/common';
import { PostModal } from 'interfaces/post';
import { getUserByID } from './user';
import { UserModel } from '../interfaces/auth';
export const uploadPost = async (data: PostModal) => {
  console.log('🚀 ~ file: post.ts:9 ~ uploadPost ~ data', data);
  try {
    const body: PostModal = {
      body: data.body,
      userID: data.userID,
      imageUrl: data.imageUrl || null,
      timestamp: JSON.stringify(Date.now()),
    };
    const result = await addDoc(collection(firestore, '/posts/'), body);
    if (result)
      return {
        isError: false,
        data: result.id,
        message: 'Bài viết đã được đăng',
      } as ServiceResult<string>;
    else
      return {
        isError: true,
        data: undefined,
        message: 'Bài viết đăng không thành công!',
      } as ServiceResult<string>;
  } catch (error) {
    console.log(' ~ file: auth.ts:10 ~ registerUser ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: 'Something wrong!',
  } as ServiceResult<string>;
};

export const getPosts = (
  callback: ({
    isError = false,
    data = undefined,
    message = '',
  }: ServiceResult<PostModal[]>) => any
) => {
  try {
    const usersRef = collection(firestore, 'posts');

    const q = query(usersRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let posts: PostModal[] = [];
        querySnapshot.forEach((doc) => {
          doc.exists() && posts.push(doc.data() as PostModal);
        });

        posts = [
          ...posts.map((item) => {
            const post = item as PostModal;
            const { body, userID, imageUrl, timestamp } = post;

            return {
              userID: userID,
              body,
              imageUrl,
              id: item.id,
              timestamp,
            } as PostModal;
          }),
        ];
        callback({
          isError: false,
          data: (posts as PostModal[]) || undefined,
          message: 'ok',
        });
      },
      (error) => console.log(error)
    );

    return unsubscribe;
  } catch (error) {
    console.log('🚀 ~ file: post.ts:36 ~ getAllPost ~ error', error);
  }
};

export const getAllPost = (
  callback: ({
    isError = false,
    data = undefined,
    message = '',
  }: ServiceResult<PostModal[]>) => void
) => {
  try {
    const posts: PostModal[] = [];
    const unsubscribe = getPosts(async ({ isError, data }) => {
      if (!isError && data) {
        for await (const { userID, ...rests } of data) {
          const { isError, data } = await getUserByID(userID);
          if (!isError && data)
            posts.push({
              ...rests,
              userAvatar: data.avatar,
              userName: `${data.firstName} ${data.lastName}`,
              userID,
            });
        }
      }

      callback({
        isError: false,
        data: posts,
        message: '',
      });
    });

    return unsubscribe;
  } catch (error) {
    console.log('🚀 ~ file: post.ts:99 ~ getAllPost ~ error', error);
  }
};
