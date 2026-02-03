import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { mapProfileToUser } from '@/shared/api/mappers';

import { User } from '../types/user';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const {
        data: { session }
      } = await extra.supabase.auth.getSession();

      if (!session) {
        return rejectWithValue('');
      }

      const { data: profile, error } = await extra.supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error || !profile) {
        return rejectWithValue('');
      }

      return mapProfileToUser(profile);
    } catch {
      return rejectWithValue('');
    }
  }
);
