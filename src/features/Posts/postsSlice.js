import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadPosts } from '../../services/graphQlApi';

const initialState = {
  list: [],
  qty: 0,
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const fetchPosts = createAsyncThunk(
  '@@posts/fetchPosts',
  async (variables = {}) => await loadPosts(variables)
);

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
        state.list = action.payload.list;
        state.qty = action.payload.qty;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const postsReducer = postsSlice.reducer;

const getAllPosts = (state) => state.posts.list;
const getPostsStatus = (state) => state.posts.status;
const getPostsQty = (state) => state.posts.qty;
const getPostsError = (state) => state.posts.error;

export {
  fetchPosts,
  getAllPosts,
  postsReducer,
  getPostsStatus,
  getPostsError,
  getPostsQty,
};
