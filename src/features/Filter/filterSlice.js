import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: '@@filter',
  initialState: { search: '', dateRange: { dateFrom: null, dateTo: null } },
  reducers: {
    setDateRange: (state, action) => {
      const newDateRange = JSON.parse(action.payload);
      state.dateRange = { ...state.dateRange, ...newDateRange };
    },
    addSearchText: (state, action) => {
      state.search = action.payload;
    },
    resetFilter: (state) => state.initialState,
  },
});

const filterReducer = filterSlice.reducer;

const { addSearchText, setDateRange, resetFilter } = filterSlice.actions;

const getFilterFields = (state) => state.filter;

export {
  filterReducer,
  addSearchText,
  setDateRange,
  resetFilter,
  getFilterFields,
};
