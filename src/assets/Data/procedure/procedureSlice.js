// Define the async thunk for fetching procedures
// procedureSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

// Define the initial state
const initialState = {
  procedures: [],
  status: "idle",
  loader: false,
  error: null,
};

// Replace "YOUR_ACTUAL_API_URL" with your actual API URL
const apiUrl = "https://65847c9c4d1ee97c6bcfd7fb.mockapi.io/api/v1/patients";

// Define the async thunk for fetching procedures
export const fetchProcedures = createAsyncThunk(
  "procedures/fetchProcedures",
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

// Define the async thunk for creating a new procedure
export const createProcedure = createAsyncThunk(
  "procedures/createProcedure",
  async (procedureData) => {
    const response = await axios.post(apiUrl, procedureData);
    return response.data;
  }
);

// Define the async thunk for updating a procedure
export const updateProcedure = createAsyncThunk(
  "procedures/updateProcedure",
  async ({ id, updatedData }) => {
    const response = await axios.put(`${apiUrl}/${id}`, updatedData);
    return response.data;
  }
);

// Define the async thunk for deleting a procedure
export const deleteProcedure = createAsyncThunk(
  "procedures/deleteProcedure",
  async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  }
);

// Create the procedures slice
const procedureSlice = createSlice({
  name: "procedures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcedures.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProcedures.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.procedures = action.payload;
      })
      .addCase(fetchProcedures.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProcedure.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createProcedure.fulfilled, (state, action) => {
        state.loader = false;
        state.procedures.push(action.payload);
      })
      .addCase(updateProcedure.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateProcedure.fulfilled, (state, action) => {
        const { id, ...updatedData } = action.payload;
        const existingProcedure = state.procedures.find(
          (procedure) => procedure.id === id
        );
        if (existingProcedure) {
          Object.assign(existingProcedure, updatedData);
        }
        state.loader = false;
      })
      .addCase(deleteProcedure.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteProcedure.fulfilled, (state, action) => {
        state.procedures = state.procedures.filter(
          (procedure) => procedure.id !== action.payload
        );
        state.loader = false;
      });
  },
});

export default procedureSlice.reducer;
export const {} = procedureSlice.actions;
