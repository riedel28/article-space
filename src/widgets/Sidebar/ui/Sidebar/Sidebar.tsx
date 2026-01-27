import { memo } from 'react';
import { AppShell, Box, CloseButton, Group, Stack } from '@mantine/core';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import classes from './Sidebar.module.css';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = memo(({ onClose }: SidebarProps) => {
  const sidebarItemsList = useSidebarItems();

  return (
    <>
      <AppShell.Section className={classes.header}>
        {/* Desktop */}
        <Group justify="center" h="100%" visibleFrom="sm">
          <AppLogo size={40} />
        </Group>
        {/* Mobile */}
        <Group justify="space-between" h="100%" hiddenFrom="sm">
          <Box>
            <AppLogo size={30} />
          </Box>
          <CloseButton onClick={onClose} />
        </Group>
      </AppShell.Section>

      <AppShell.Section grow className={classes.nav}>
        <Stack gap={4}>
          {sidebarItemsList.map((item) => (
            <SidebarItem item={item} key={item.path} onClick={onClose} />
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
