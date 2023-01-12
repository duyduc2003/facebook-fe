import { configureStore } from '@reduxjs/toolkit';

import writePost from 'components/WritePost/writePostState';
import posts from 'components/ListPosted/PostState';

export const store = configureStore({
  reducer: {
    writePost,
    posts,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
