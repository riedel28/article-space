import { memo, useMemo, useState } from 'react';
import { Stack } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import classes from './Sidebar.module.css';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg?react';

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = memo(
  ({
    className,
    collapsed: controlledCollapsed,
    onToggle: controlledOnToggle
  }: SidebarProps) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const sidebarItemsList = useSidebarItems();

    // Use controlled state if provided, otherwise use internal state
    const collapsed =
      controlledCollapsed !== undefined
        ? controlledCollapsed
        : internalCollapsed;

    const onToggle = () => {
      if (controlledOnToggle) {
        controlledOnToggle();
      } else {
        setInternalCollapsed((prev) => !prev);
      }
    };

    const itemsList = useMemo(
      () =>
        sidebarItemsList.map((item) => (
          <SidebarItem item={item} collapsed={collapsed} key={item.path} />
        )),
      [collapsed, sidebarItemsList]
    );

    return (
      <aside
        data-testid="sidebar"
        className={classNames(
          classes.sidebar,
          { [classes.collapsed]: collapsed },
          [className]
        )}
      >
        <div className={classes.logoSection}>
          <AppLogo size={collapsed ? 32 : 50} className={classes.appLogo} />
        </div>

        <nav className={classes.navigation}>
          <Stack gap={4} className={classes.navItems}>
            {itemsList}
          </Stack>
        </nav>

        <div className={classes.footer}>
          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
          </div>
        </div>

        <Icon
          data-testid="sidebar-toggle"
          onClick={onToggle}
          className={classes.collapseBtn}
          Svg={ArrowIcon}
          clickable
        />
      </aside>
    );
  }
);
