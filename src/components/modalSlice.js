// modalSlice.js

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    data: {},
  },
  reducers: {
    openModal: (state, payload) => {
      state.isOpen = true;
      state.data = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.data = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
