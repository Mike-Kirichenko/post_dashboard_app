import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/Posts/postsSlice';
import { postPreviewReducer } from '../features/PostPreview/postPreviewSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    postPreview: postPreviewReducer,
  },
  devTools: true,
});
