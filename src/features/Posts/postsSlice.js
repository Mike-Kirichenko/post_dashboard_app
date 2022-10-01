import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadPosts } from "../../services/graphQlApi";

const initialState = {
  list: [],
  selected: [],
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
      state.selected.push(action.payload);
    },
    addAllToSelected: (state, action) => {
      state.selected.push(...action.payload);
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

const { addToSelected, addAllToSelected, removeFromSelected } =
  postsSlice.actions;

const getAllPosts = (state) => state.posts.list;
const getPostsStatus = (state) => state.posts.status;
const getSelectedPosts = (state) => state.posts.selected;
const getPostsQty = (state) => state.posts.qty;

export {
  fetchPosts,
  getAllPosts,
  postsReducer,
  getPostsStatus,
  getPostsQty,
  addToSelected,
  addAllToSelected,
  removeFromSelected,
  getSelectedPosts
};
