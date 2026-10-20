// store/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import api from '@/lib/api';

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await api.get("/me", { withCredentials: true });
  return response.data;
});

export const registerFrontDesk = createAsyncThunk(
  'user/register',
  async (userData: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post('register/frontdesk', userData, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Registration failed');
    }
  }
);

// Fetch all users (admin/doctor only)
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("users", { withCredentials: true });
      return response.data.data; // users array
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching users");
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.delete(`users/${id}`, { withCredentials: true });
      return id; // return ID to remove from state
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }: { id: number; data: { name: string; email: string } }, { rejectWithValue }) => {
    try {
      const res = await api.put(`users/${id}`, data, { withCredentials: true });
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

interface UserState {
  user: User | null;
  roles: string[];
  permissions: string[];
  users: User[];
  loading: boolean;
  usersLoading: boolean;
  error: string | null;
  usersError: string | null;
}

const initialState: UserState = {
  user: null,
  roles: [],
  permissions: [],
  users: [],
  loading: false,
  usersLoading: false,
  error: null,
  usersError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState, 
  },
  extraReducers: (builder) => {
    builder
      // Current user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
        state.permissions = action.payload.permissions;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "An error occurred";
      })
      // .addCase(registerFrontDesk.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(registerFrontDesk.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      //   state.roles = action.payload.roles || [];
      //   state.permissions = action.payload.permissions || [];
      // })
      // .addCase(registerFrontDesk.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      // All users
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      });
  },
});
export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
