import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const createPrescription = createAsyncThunk(
  "prescription/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await api.post("/prescriptions", payload, {
        withCredentials: true,
      });
      return res.data.prescription;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrescription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default prescriptionSlice.reducer;
