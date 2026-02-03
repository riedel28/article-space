import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { getUserAuthData, userActions } from '@/entities/User';
import { mapProfile } from '@/shared/api/mappers';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;

  const formData = getProfileForm(getState());

  const errors = validateProfileData(formData);

  if (errors.length) {
    return rejectWithValue(errors);
  }

  try {
    const { data, error } = await extra.supabase
      .from('profiles')
      .update({
        first_name: formData?.first ?? null,
        last_name: formData?.lastname ?? null,
        age: formData?.age ?? null,
        currency: formData?.currency ?? null,
        country: formData?.country ?? null,
        city: formData?.city ?? null,
        username: formData?.username ?? null,
        avatar: formData?.avatar ?? null
      })
      .eq('id', formData?.id)
      .select('*')
      .single();

    if (error || !data) {
      throw new Error();
    }

    const profile = mapProfile(data);

    const authData = getUserAuthData(getState());

    if (authData && authData.id === formData?.id) {
      dispatch(
        userActions.setAuthData({
          ...authData,
          avatar: profile.avatar
        })
      );
    }

    return profile;
  } catch {
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
