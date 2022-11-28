import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  documentView: {}
};

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    documentView: (state, action) => {
      state.documentView = action.payload;
    }
  }
});

export const { documentView } = documentSlice.actions;
export default documentSlice.reducer;
