import { createSlice } from '@reduxjs/toolkit';

const postPreviewSlice = createSlice({
  name: '@@postPreview',
  initialState: {},
  reducers: {
    addPostPreviewData: (state, action) => {
      state.post = action.payload;
    },
    reset: (state) => {
      state.post = {};
    },
  },
});

const { addPostPreviewData, reset } = postPreviewSlice.actions;

const postPreviewReducer = postPreviewSlice.reducer;

const getPostPreview = (state) => state.postPreview.post;

export { postPreviewReducer, getPostPreview, addPostPreviewData, reset };
