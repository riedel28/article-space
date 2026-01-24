import React, { Suspense } from 'react';

export const SuspenseDecorator = (StoryComponent: React.ComponentType) => (
  <Suspense>
    <StoryComponent />
  </Suspense>
);
