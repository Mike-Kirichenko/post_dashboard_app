import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadPosts } from '../../services/graphQlApi';

const initialState = {
  list: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk('@@posts/fetchPosts', loadPosts);

const postsSlice = createSlice({
  name: '@@posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const postsReducer = postsSlice.reducer;

export const getAllPosts = (state) => state.posts.list;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
