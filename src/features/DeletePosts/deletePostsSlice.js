import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  qty: 0,
};

const deletePostsSlice = createSlice({
  name: '@@deletePosts',
  initialState,
  reducers: {
    addToSelected: (state, action) => {
      if (Array.isArray(action.payload)) {
        const newIds = action.payload.filter((el) => !state.list.includes(el));
        state.list.push(...newIds);
      } else {
        state.list.push(action.payload);
      }
    },
    removeFromSelected: (state, action) => {
      let withoutRemovedItems;
      if (Array.isArray(action.payload)) {
        withoutRemovedItems = state.list.filter(
          (el) => !action.payload.includes(el)
        );
      } else {
        withoutRemovedItems = state.list.filter((el) => el !== action.payload);
      }
      state.list = withoutRemovedItems;
    },
    setQty: (state, action) => {
      state.qty = action.payload;
    },
    reset: (state) => {
      state.list = [];
    },
  },
});

const deletePostsReducer = deletePostsSlice.reducer;

const { addToSelected, removeFromSelected, setQty, reset } =
  deletePostsSlice.actions;

const getSelectedPosts = (state) => state.deletePosts.list;
const getQty = (state) => state.deletePosts.qty;

export {
  deletePostsReducer,
  getSelectedPosts,
  getQty,
  addToSelected,
  removeFromSelected,
  setQty,
  reset,
};
