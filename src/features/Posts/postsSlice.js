import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadPosts } from '../../services/graphQlApi';
import { deletePosts } from '../../services/graphQlApi';

const initialState = {
  list: [],
  activePage: 1,
  qty: 0,
  status: 'idle',
  updStatus: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
};

const fetchPosts = createAsyncThunk(
  '@@posts/fetchPosts',
  async (variables = {}) => await loadPosts(variables)
);

const deleteByIds = createAsyncThunk(
  '@@posts/deleteByIds',
  async (postIds) => await deletePosts(postIds)
);

const postsSlice = createSlice({
  name: '@@posts',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.list;
        state.qty = action.payload.qty;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteByIds.pending, (state) => {
        state.updStatus = 'loading';
      })
      .addCase(deleteByIds.fulfilled, (state, action) => {
        state.updStatus = 'succeeded';
      })
      .addCase(deleteByIds.rejected, (state) => {
        state.updStatus = 'failed';
      });
  },
});

const postsReducer = postsSlice.reducer;

const { setActivePage } = postsSlice.actions;

const getAllPosts = (state) => state.posts.list;
const getPostsStatus = (state) => state.posts.status;
const getUpdStatus = (state) => state.posts.updStatus;
const getActivePage = (state) => state.posts.activePage;
const getPostsQty = (state) => state.posts.qty;

export {
  getAllPosts,
  postsReducer,
  getPostsStatus,
  getPostsQty,
  getActivePage,
  getUpdStatus,
  fetchPosts,
  deleteByIds,
  setActivePage,
};
