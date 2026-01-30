import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';

import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';

import classes from './SidebarItem.module.css';

interface SidebarItemProps {
  item: SidebarItemType;
  onClick?: () => void;
}

export const SidebarItem = memo(({ item, onClick }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  const location = useLocation();

  if (item.authOnly && !isAuth) {
    return null;
  }

  const isActive =
    item.path === '/' ? location.pathname === item.path : location.pathname.startsWith(item.path);

  return (
    <NavLink
      component={Link}
      to={item.path}
      label={t(item.text)}
      leftSection={<item.Icon size={20} />}
      active={isActive}
      color="brand"
      className={classes.sidebarItem}
      onClick={onClick}
    />
  );
});
