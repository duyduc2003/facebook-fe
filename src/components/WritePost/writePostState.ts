import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

const initState = {
  isShowPopupWritePost: false,
};

const writePostState = createSlice({
  name: 'writePost',
  initialState: initState,
  reducers: {
    showPopupWritePost(state, { payload }: PayloadAction<boolean>) {
      state.isShowPopupWritePost = payload;
    },
  },
});

export const selectors = {
  selectIsShowPopupWritePost: (s: RootState) =>
    s.writePost.isShowPopupWritePost,
};
export const actions = writePostState.actions;
export default writePostState.reducer;
