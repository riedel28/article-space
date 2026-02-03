import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import { mapProfileToUser } from '@/shared/api/mappers';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    const { userActions } = await import('@/entities/User');

    try {
      const { error: authError } = await extra.supabase.auth.signInWithPassword({
        email: `${authData.username}@article-space.local`,
        password: authData.password
      });

      if (authError) {
        return rejectWithValue(authError.message);
      }

      const {
        data: { user: authUser }
      } = await extra.supabase.auth.getUser();

      if (!authUser) {
        return rejectWithValue('error');
      }

      const { data: profile, error: profileError } = await extra.supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileError || !profile) {
        return rejectWithValue('error');
      }

      const user = mapProfileToUser(profile);
      dispatch(userActions.setAuthData(user));
      return user;
    } catch {
      return rejectWithValue('error');
    }
  }
);
