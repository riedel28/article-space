import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
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
