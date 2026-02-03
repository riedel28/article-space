import { mapProfileToUser } from '@/shared/api/mappers';
import { rtkApi } from '@/shared/api/rtkApi';
import { supabase } from '@/shared/api/supabase';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface SetJsonSettingsArg {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      queryFn: async ({ userId, jsonSettings }) => {
        const { data, error } = await supabase
          .from('profiles')
          .update({ json_settings: jsonSettings })
          .eq('id', userId)
          .select('*')
          .single();

        if (error || !data) {
          return { error: { status: 'CUSTOM_ERROR', error: error?.message ?? 'Unknown error' } };
        }

        return { data: mapProfileToUser(data) };
      }
    }),
    getUserDataById: build.query<User, string>({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error || !data) {
          return { error: { status: 'CUSTOM_ERROR', error: error?.message ?? 'Unknown error' } };
        }

        return { data: mapProfileToUser(data) };
      }
    })
  })
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
