import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadPosts, deletePosts, addPost } from "../../services/graphQLApi";

const initialQueryObj = { page: 1, limit: 10 };

const initialState = {
  list: [],
  qty: 0,
  status: "idle",
  queryObj: initialQueryObj,
  updStatus: "idle",
};

const fetchPosts = createAsyncThunk(
  "@@posts/fetchPosts",
  async (variables) => await loadPosts(variables)
);

const deleteByIds = createAsyncThunk(
  "@@posts/deleteByIds",
  async (postIdsWithQuery) => await deletePosts(postIdsWithQuery)
);

const addNewPost = createAsyncThunk(
  "@@posts/addNewPost",
  async (postDataWithQuery) => await addPost(postDataWithQuery)
);

const postsSlice = createSlice({
  name: "@@posts",
  initialState,
  reducers: {
    changeQueryObj: (state, action) => {
      state.queryObj = { ...state.queryObj, ...action.payload };
    },
    changeUpdState: (state, action) => {
      state.updStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.qty = action.payload.qty;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteByIds.pending, (state) => {
        state.updStatus = "loading";
      })
      .addCase(deleteByIds.fulfilled, (state, action) => {
        state.updStatus = "succeeded";
        state.list = action.payload.list;
        state.qty = action.payload.qty;
        state.queryObj.page = action.payload.activePage;
      })
      .addCase(deleteByIds.rejected, (state) => {
        state.updStatus = "failed";
      })
      .addCase(addNewPost.pending, (state) => {
        state.updStatus = "succeeded";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.updStatus = "succeeded";
        state.list = action.payload.list;
        state.qty = action.payload.qty;
        state.queryObj.page = action.payload.activePage;
      })
      .addCase(addNewPost.rejected, (state) => {
        state.updStatus = "failed";
      });
  },
});

const postsReducer = postsSlice.reducer;

const { changeQueryObj, changeUpdState } = postsSlice.actions;

const getAllPosts = (state) => state.posts.list;
const getPostsStatus = (state) => state.posts.status;
const getUpdStatus = (state) => state.posts.updStatus;
const getQueryObj = (state) => state.posts.queryObj;
const getPostsQty = (state) => state.posts.qty;

export {
  getAllPosts,
  postsReducer,
  getPostsStatus,
  getPostsQty,
  getUpdStatus,
  getQueryObj,
  changeUpdState,
  fetchPosts,
  addNewPost,
  deleteByIds,
  changeQueryObj,
};
