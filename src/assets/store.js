// store.js
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/modalSlice";
import procedureReducer from "../assets/Data/procedure/procedureSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    procedures: procedureReducer,
  },
});
