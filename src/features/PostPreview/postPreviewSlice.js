import { createSlice } from '@reduxjs/toolkit';

const postPreviewSlice = createSlice({
  name: '@@postPreview',
  initialState: {},
  reducers: {
    addPostPreviewData: (state, action) => action.payload,
    resetPreview: (state) => ({}),
  },
});

const postPreviewReducer = postPreviewSlice.reducer;

const { addPostPreviewData, resetPreview } = postPreviewSlice.actions;

const getPostPreview = (state) => state.postPreview;

export { postPreviewReducer, getPostPreview, addPostPreviewData, resetPreview };
