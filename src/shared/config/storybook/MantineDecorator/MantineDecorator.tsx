import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';

import { MantineProvider } from '@mantine/core';
import React from 'react';

import { theme } from '../../mantine/theme';

export const MantineDecorator = (StoryComponent: React.ComponentType) => (
  <MantineProvider theme={theme} defaultColorScheme="light">
    <StoryComponent />
  </MantineProvider>
);
