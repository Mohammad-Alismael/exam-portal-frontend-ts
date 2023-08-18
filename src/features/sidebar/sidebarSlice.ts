import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { tab: null, selectedCourseId: "" },
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setSelectedCourseId: (state, action) => {
      state.selectedCourseId = action.payload;
    },
  },
});

export const { setTab,setSelectedCourseId } = sidebarSlice.actions;

export default sidebarSlice.reducer;

export const selectTab = (state) => state.sidebar.tab;
export const selectCourseId = (state) => state.sidebar.selectedCourseId;
