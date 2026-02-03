import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { mapProfile } from '@/shared/api/mappers';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const { data, error } = await extra.supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();

      if (error || !data) {
        throw new Error();
      }

      return mapProfile(data);
    } catch {
      return rejectWithValue('error');
    }
  }
);
