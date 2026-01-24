import { memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './Sidebar.module.css';
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

export const Sidebar = memo(({ className, collapsed: controlledCollapsed, onToggle: controlledOnToggle }: SidebarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const sidebarItemsList = useSidebarItems();

  // Use controlled state if provided, otherwise use internal state
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

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
    <div
      data-testid="sidebar"
      className={classNames(
        cls.SidebarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className]
      )}
    >
      <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        Svg={ArrowIcon}
        clickable
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  );
});
