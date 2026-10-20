import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const createMedicalCertificate = createAsyncThunk(
  "medical/create",
  async (data: {
    patients_name: string;
    age: string;
    issue_date: string;
    impression?: string;
    reason?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post("/certifications", data, { withCredentials: true });
      return response.data.certificate;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to save certificate");
    }
  }
);

const medicalSlice = createSlice({
  name: "medical",
  initialState: {
    loading: false,
    error: null as string | null,
    saved: false,
  },
  reducers: {
    resetSaved: (state) => {
      state.saved = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMedicalCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saved = false;
      })
      .addCase(createMedicalCertificate.fulfilled, (state) => {
        state.loading = false;
        state.saved = true;
      })
      .addCase(createMedicalCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetSaved } = medicalSlice.actions;
export default medicalSlice.reducer;
