import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/Posts/postsSlice';
import { postPreviewReducer } from '../features/PostPreview/postPreviewSlice';
import { deletePostsReducer } from '../features/DeletePosts/deletePostsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    postPreview: postPreviewReducer,
    deletePosts: deletePostsReducer,
  },
  devTools: true,
});
