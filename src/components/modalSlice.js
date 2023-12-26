// modalSlice.js

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    data: null, // Add data property to store additional information
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload; // Set the data property with the payload
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.data = null; // Clear data when closing modal
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
