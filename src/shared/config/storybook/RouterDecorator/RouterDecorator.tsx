import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryComponent: React.ComponentType) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);
