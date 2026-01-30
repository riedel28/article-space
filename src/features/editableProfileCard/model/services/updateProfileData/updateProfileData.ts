import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { userActions, getUserAuthData } from '@/entities/User';
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
    const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);

    if (!response.data) {
      throw new Error();
    }

    const authData = getUserAuthData(getState());

    // Sync avatar to global user state if user is editing their own profile
    if (authData && authData.id === formData?.id) {
      dispatch(
        userActions.setAuthData({
          ...authData,
          avatar: response.data.avatar
        })
      );

      // Persist avatar to users table so it loads correctly on page refresh
      await extra.api.patch(`/users/${authData.id}`, {
        avatar: response.data.avatar
      });
    }

    return response.data;
  } catch {
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
