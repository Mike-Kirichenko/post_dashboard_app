import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadPosts } from "../../services/graphQlApi";

const initialState = {
  list: [],
  selected: [],
  preview: {},
  activePage: 1,
  deleteModal: false,
  qty: 0,
  status: "idle" //'idle' | 'loading' | 'succeeded' | 'failed'
};

const fetchPosts = createAsyncThunk(
  "@@posts/fetchPosts",
  async (variables = {}) => await loadPosts(variables)
);

const postsSlice = createSlice({
  name: "@@posts",
  initialState,
  reducers: {
    addToSelected: (state, action) => {
      if (Array.isArray(action.payload)) {
        const newIds = action.payload.filter(
          (el) => !state.selected.includes(el)
        );
        state.selected.push(...newIds);
      } else {
        state.selected.push(action.payload);
      }
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
    removeFromSelected: (state, action) => {
      let withoutRemovedItems;
      if (Array.isArray(action.payload)) {
        withoutRemovedItems = state.selected.filter(
          (el) => !action.payload.includes(el)
        );
      } else {
        withoutRemovedItems = state.selected.filter(
          (el) => el !== action.payload
        );
      }
      state.selected = withoutRemovedItems;
    },
    addPostPreviewData: (state, action) => {
      state.preview = action.payload;
    },
    resetPreview: (state) => {
      state.preview = {};
    }
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
      });
  }
});

const postsReducer = postsSlice.reducer;

const {
  addToSelected,
  addPostPreviewData,
  resetPreview,
  removeFromSelected,
  setActivePage,
  setDeleteModal
} = postsSlice.actions;

const getAllPosts = (state) => state.posts.list;
const getPostsStatus = (state) => state.posts.status;
const getSelectedPosts = (state) => state.posts.selected;
const getActivePage = (state) => state.posts.activePage;
const getPostPreview = (state) => state.posts.preview;
const getPostsQty = (state) => state.posts.qty;
const getDeleteModal = (state) => state.posts.deleteModal;

export {
  getAllPosts,
  postsReducer,
  getPostsStatus,
  getPostsQty,
  getActivePage,
  getPostPreview,
  getSelectedPosts,
  getDeleteModal,
  fetchPosts,
  addToSelected,
  addPostPreviewData,
  resetPreview,
  removeFromSelected,
  setActivePage,
  setDeleteModal
};
