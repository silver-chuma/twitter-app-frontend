import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';

export const fetchMyTweets = createAsyncThunk('tweets/my', async () => {
  const r = await api.get('/tweets/mine');
  return r.data;
});

export const fetchShared = createAsyncThunk('tweets/shared', async () => {
  const r = await api.get('/tweets/shared');
  return r.data;
});

export const createTweet = createAsyncThunk('tweets/create', async (payload: { content: string, recipients: string[] }) => {
  const r = await api.post('/tweets', payload);
  return r.data;
});

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState: { my: [] as any[], shared: [] as any[], status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMyTweets.pending, (s) => { s.status = 'loading'; })
    b.addCase(fetchMyTweets.fulfilled, (s, a) => { s.my = a.payload; s.status = 'succeeded'; });
    b.addCase(fetchMyTweets.rejected, (s) => { s.status = 'failed'; });

    b.addCase(fetchShared.pending, (s) => { s.status = 'loading'; })
    b.addCase(fetchShared.fulfilled, (s, a) => { s.shared = a.payload; s.status = 'succeeded'; });
    b.addCase(fetchShared.rejected, (s) => { s.status = 'failed'; });

    b.addCase(createTweet.pending, (s) => { s.status = 'loading'; })
    b.addCase(createTweet.fulfilled, (s, a) => { s.my = [a.payload, ...s.my]; s.status = 'succeeded'; });
    b.addCase(createTweet.rejected, (s) => { s.status = 'failed'; });
  }
});

export default tweetsSlice.reducer;