import { AppShell, Box, CloseButton, Group, Stack } from '@mantine/core';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';

import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import classes from './Sidebar.module.css';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = memo(({ onClose }: SidebarProps) => {
  const { t } = useTranslation();
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
          <CloseButton onClick={onClose} aria-label={t('Close menu')} />
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
