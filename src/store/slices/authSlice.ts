import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';

export const register = createAsyncThunk('auth/register', async (payload: { email: string, password: string, fullName?: string }) => {
  const r = await api.post('/auth/register', payload);
  return r.data;
});

export const login = createAsyncThunk('auth/login', async (payload: { email: string, password: string }) => {
  const r = await api.post('/auth/login', payload);
  localStorage.setItem('token', r.data.accessToken);
  return r.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null as any, token: localStorage.getItem('token') || null, status: 'idle', error: null as any },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(login.fulfilled, (s, a) => { s.status = 'succeeded'; s.token = a.payload.accessToken; })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;