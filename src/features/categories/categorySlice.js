import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Data / ML'],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(c => c !== action.payload);
    }
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;