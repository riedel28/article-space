import React from 'react';

// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ColorScheme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: ColorScheme) => (StoryComponent: React.ComponentType) => (
  <ThemeProvider initialTheme={theme}>
    <StoryComponent />
  </ThemeProvider>
);
