import React from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const FeaturesFlagsDecorator =
    (features: FeatureFlags) => (StoryComponent: React.ComponentType) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
