import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';

import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

import { theme } from '@/shared/config/mantine/theme';
import { ColorScheme } from '@/shared/const/theme';

interface ThemeProviderProps {
  initialTheme?: ColorScheme;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;

  return (
    <MantineProvider theme={theme} defaultColorScheme={initialTheme || 'light'}>
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
