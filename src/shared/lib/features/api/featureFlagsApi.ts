import { rtkApi } from '@/shared/api/rtkApi';
import { supabase } from '@/shared/api/supabase';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
  userId: string;
  features: Partial<FeatureFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
      queryFn: async ({ userId, features }) => {
        const { error } = await supabase
          .from('profiles')
          .update({ features })
          .eq('id', userId);

        if (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }

        return { data: undefined };
      }
    })
  })
});

export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlags.initiate;
