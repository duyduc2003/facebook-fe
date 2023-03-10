import { firestore } from '@/appFirebase';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { ID, ServiceResult } from '@/interfaces/common';
import { PostModal } from '@/interfaces/post';
import { getUserByID } from './user';

export const getAllPathPosts = async () => {
  try {
    const { data, isError } = await getPosts();
    if (!isError && data)
      return {
        isError,
        data: data.map((item) => ({
          params: {
            post: item.id,
          },
        })),
      };
  } catch (error) {
    console.log('🚀 ~ file: post.ts:22 ~ getAllPathPost ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
  };
};

export const deletePostByID = async (id: ID) => {
  try {
    await deleteDoc(doc(firestore, 'posts', id));
  } catch (error) {
    console.log('🚀 ~ file: post.ts:19 ~ deletePortByID ~ error', error);
  }
};

export const uploadPost = async (data: PostModal) => {
  try {
    const body: PostModal = {
      body: data.body || null,
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
      } as const;
    else
      return {
        isError: true,
        data: undefined,
        message: 'Bài viết đăng không thành công!',
      } as const;
  } catch (error) {
    console.log(' ~ file: auth.ts:10 ~ registerUser ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: 'Something wrong!',
  } as const;
};

export const getPostsAllField = async () => {
  try {
    const posts: PostModal[] = [];
    const { isError, data } = await getPosts();
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

    return {
      isError: false,
      data: posts,
      message: '',
    } as const;
  } catch (error) {
    console.log('🚀 ~ file: post.ts:99 ~ getAllPost ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: '',
  } as const;
};

export const getNewPosts = async (
  callback: ({
    isError = true,
    data = undefined,
    message = '',
  }: ServiceResult<PostModal[]>) => void
) => {
  const usersRef = collection(firestore, 'posts');
  const q = query(usersRef, orderBy('timestamp', 'desc'));
  const unsubscribe = onSnapshot(
    q,
    async (querySnapshot) => {
      const newPosts: PostModal[] = [];

      for await (const doc of querySnapshot.docs) {
        const { userID, ...rests } = doc.data() as PostModal;
        const { isError, data } = await getUserByID(userID);
        if (!isError && data)
          newPosts.push({
            ...rests,
            userAvatar: data.avatar,
            userName: `${data.firstName} ${data.lastName}`,
            userID,
            id: doc.id,
          });
      }
      callback({
        isError: false,
        data: newPosts,
        message: '',
      });
    },
    (e) => console.log(e)
  );

  return { unsubscribe } as const;
};

export const getPostById = async (postID: ID) => {
  try {
    const docRef = doc(firestore, 'posts', postID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postData = docSnap.data() as PostModal;
      return {
        isError: false,
        data: {
          ...postData,
          id: docSnap.id,
        } as PostModal,
        message: '',
      } as ServiceResult<PostModal>;
    } else
      return {
        isError: true,
        data: undefined,
        message: '',
      } as ServiceResult<PostModal>;
  } catch (error) {
    console.log('🚀 ~ file: post.ts:133 ~ getPostById ~ error', error);
  }
  return {
    isError: true,
    data: undefined,
    message: '',
  } as ServiceResult<PostModal>;
};

export const getPostsByUserID = async (userID: ID) => {
  try {
    const usersRef = collection(firestore, 'posts');
    const q = query(usersRef, where('userID', '==', userID));
    const querySnapshot = await getDocs(q);
    let posts: PostModal[] = [];
    querySnapshot.forEach((doc) => {
      doc.exists() &&
        posts.push({
          ...(doc.data() as PostModal),
          id: doc.id,
        });
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

    return {
      isError: false,
      data: posts as PostModal[],
      message: 'ok',
    } as const;
  } catch (error) {
    console.log('🚀 ~ file: post.ts:121 ~ getPostsByUserID ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: 'not ok',
  } as const;
};

const getPosts = async () => {
  try {
    const usersRef = collection(firestore, 'posts');

    const q = query(usersRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    let posts: PostModal[] = [];
    querySnapshot.forEach((doc) => {
      doc.exists() &&
        posts.push({
          ...(doc.data() as PostModal),
          id: doc.id,
        });
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
    return {
      isError: false,
      data: posts as PostModal[],
      message: 'ok',
    } as const;
  } catch (error) {
    console.log('🚀 ~ file: post.ts:36 ~ getAllPost ~ error', error);
  }

  return {
    isError: true,
    data: undefined,
    message: 'not ok',
  } as const;
};
