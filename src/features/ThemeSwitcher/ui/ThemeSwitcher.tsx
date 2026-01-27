import { memo } from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ThemeSwitcher.module.css';

export const ThemeSwitcher = memo(() => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      onClick={() => toggleColorScheme()}
      className={classes.icon}
      aria-label="Toggle theme"
    >
      {dark ? (
        <IconSun size={20} stroke={1.8} />
      ) : (
        <IconMoon size={20} stroke={1.8} />
      )}
    </ActionIcon>
  );
});
