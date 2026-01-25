import { memo } from 'react';
import { AppShell, Group, Stack } from '@mantine/core';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import classes from './Sidebar.module.css';

export const Sidebar = memo(() => {
  const sidebarItemsList = useSidebarItems();

  return (
    <>
      <AppShell.Section className={classes.header}>
        <AppLogo size={50} />
      </AppShell.Section>

      <AppShell.Section grow className={classes.nav}>
        <Stack px="md" gap={4}>
          {sidebarItemsList.map((item) => (
            <SidebarItem item={item} key={item.path} />
          ))}
        </Stack>
      </AppShell.Section>

      <AppShell.Section className={classes.footer}>
        <Group justify="center" gap="md">
          <ThemeSwitcher />
          <LangSwitcher short={false} />
        </Group>
      </AppShell.Section>
    </>
  );
});
