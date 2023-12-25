// store.js
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
