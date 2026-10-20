// store/slices/patientSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/lib/api'; // your axios instance
import { PatientData } from '@/lib/api';


// interface FetchPatientsParams {
//   page?: number;
//   perPage?: number;
// }

interface PatientState {
  data: PatientData[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  today_total: number;
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  data: [],
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  today_total: 0,
  loading: false,
  error: null,
};

// export const fetchPatients = createAsyncThunk('patients/fetchAll', async () => {
//   const response = await api.get('/patients'); // API endpoint
//   return response.data;
// });
// export const fetchPatients = createAsyncThunk(
//   'patients/fetchAll',
//   async ({ page = 1, perPage = 10 }: FetchPatientsParams) => {
//     const response = await api.get(`/patients?page=${page}&per_page=${perPage}`);
//     return response.data; // contains data, current_page, last_page, etc.
//   }
// );
export const fetchPatients = createAsyncThunk(
  'patients/fetchAll',
  async ({ page = 1, search = '' }: { page?: number; search?: string }) => {
    const response = await api.get(`/patients?page=${page}&search=${search}`);
    // console.log("res",search, response.data)
    return response.data; // returns { data, current_page, last_page, per_page, total, ... }
  } 
  // async ({ page, search }: { page: number; search?: string }) => {
  //   const response = await api.get('/patients', {
  //     params: { page, search }
  //   });
  //   console.log("res",response.data)
  //   return response.data;
  // }
);

export const createPatient = createAsyncThunk(
  'patients/create',
  async (data: PatientData, thunkAPI) => {
    const response = await api.post('/patients', data);
    return response.data;
  }
);

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async ({ updatedData, id }: { updatedData: PatientData;id: number; }, thunkAPI) => {
    try {
      const response = await api.put(`/patients/${id}`, updatedData);
      // console.log("update", response)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error updating patient');
    }
  }
);

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id: number | string, thunkAPI) => {
    try {
      await api.delete(`/patients/${id}`);
      return id; // return the deleted ID
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPatient.fulfilled, (state, action) => {
        state.data.push(action.payload.data); // Add new patient to the list
        state.today_total = action.payload.today_total;
        state.total = action.payload.total;
      })
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        // state.loading = false;
        // state.data = action.payload;
        // const { data, current_page, last_page, per_page, total } = action.payload;
        // state.data = data;
        // state.pagination = { current_page, last_page, per_page, total };
        state.loading = false;
        state.data = action.payload.data;
        state.current_page = action.payload.current_page;
        state.last_page = action.payload.last_page;
        state.per_page = action.payload.per_page;
        state.today_total = action.payload.today_total;
        state.total = action.payload.total;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patients';
      })
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPatient = action.payload.data;

        const index = state.data.findIndex((p) => p.id === updatedPatient.id);
        if (index !== -1) {
          state.data[index] = updatedPatient; // update the specific patient in the array
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        // remove the patient from the list
        state.data = state.data.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'An error occurred';
      });
  },
});

export default patientSlice.reducer;
