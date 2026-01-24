import { memo } from 'react';
import { ActionIcon } from '@mantine/core';
import ThemeIcon from '@/shared/assets/icons/theme.svg?react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();

  return (
    <ActionIcon
      variant="subtle"
      onClick={() => toggleTheme()}
      className={className}
      aria-label="Toggle theme"
    >
      <ThemeIcon />
    </ActionIcon>
  );
});
