import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { PostModal } from '@/interfaces/post';
import { ID } from '@/interfaces/common';

interface PostsState {
  posts: PostModal[];
}

const initState: PostsState = {
  posts: [],
};

const postState = createSlice({
  name: 'Post',
  initialState: initState,
  reducers: {
    setPosts(state, action: PayloadAction<PostModal[]>) {
      state.posts = [...action.payload];
    },

    addPosts(state, action: PayloadAction<PostModal[]>) {
      state.posts = [...action.payload, ...state.posts];
    },
    deletePostByID(state, action: PayloadAction<ID>) {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const selectors = {
  selectPosts: (s: RootState) => s.posts.posts,
};
export const actions = postState.actions;
export default postState.reducer;
