import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { tab: null },
  reducers: {
    setTab: (state, action) => {
      const { tab } = action.payload;
      state.tab = tab;
    },
  },
});

export default sidebarSlice.reducer;

export const selectTab = (state) => state.sidebar.tab;
