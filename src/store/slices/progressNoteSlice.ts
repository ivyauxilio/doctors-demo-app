// store/slices/progressNoteSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "@/lib/api"; // your axios instance
import { RootState } from '../store';

export const fetchProgressNotesByPatient = createAsyncThunk(
  'progressNotes/fetchByPatient',
  async (patientId: number) => {
    const response = await api.get(`/patients/${patientId}/progress-notes`);
    // console.log("notes",response.data)
    return response.data;
  }
);

export const addProgressNote = createAsyncThunk(
  'progressNotes/add',
  async (noteData: { patient_id?: number; doctor_id?: number; note: string; visit_date?: string }) => {
    const response = await api.post(`/patients/${noteData.patient_id}/progress-notes`, noteData);
    return response.data;
  }
);

export const deleteProgressNote = createAsyncThunk<
  number,
  { patientId: number; noteId: number }
  >(
  'progressNotes/delete',
  async ({ patientId, noteId }) => {
    await api.delete(`/patients/${patientId}/progress-notes/${noteId}`);
    return noteId; 
  }
);

interface Note {
  id: number;
  note: string;
  date: string;
  visit_date: string;
  year: number;
}

interface ProgressNoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgressNoteState = {
  notes: [],
  loading: false,
  error: null,
};

export const progressNoteSlice = createSlice({
  name: 'progressNotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressNotesByPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgressNotesByPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.map((note: Note) => ({
          ...note,
          year: new Date(note.visit_date || note.date).getFullYear(),
        }));
      })
      .addCase(fetchProgressNotesByPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load progress notes';
      })
      .addCase(deleteProgressNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export const selectProgressNotes = (state: RootState) => state.progressNotes;
export default progressNoteSlice.reducer;
