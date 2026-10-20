// store/logSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchLogs = createAsyncThunk('logs/fetchLogs', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/logs', { withCredentials: true });
    return res.data.logs;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch logs');
  }
});

export const addLog = createAsyncThunk(
  'logs/addLog',
  async (payload: { action: string; description?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/logs', payload, { withCredentials: true });
      return res.data.log;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add log');
    }
  }
);

interface LogState {
  logs: any[];
  loading: boolean;
  error: string | null;
}

const initialState: LogState = {
  logs: [],
  loading: false,
  error: null,
};

const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addLog.fulfilled, (state, action) => {
        state.logs.unshift(action.payload); // add to top
      });
  },
});

export default logSlice.reducer;
