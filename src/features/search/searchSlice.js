import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchKey: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searchKey } = searchSlice.actions;

export default searchSlice.reducer;
