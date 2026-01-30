import React from 'react';

import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeaturesFlagsDecorator =
  (features: FeatureFlags) => (StoryComponent: React.ComponentType) => {
    setFeatureFlags(features);
    return <StoryComponent />;
  };
