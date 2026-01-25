import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import classes from './SidebarItem.module.css';

interface SidebarItemProps {
  item: SidebarItemType;
}

export const SidebarItem = memo(({ item }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  const location = useLocation();

  if (item.authOnly && !isAuth) {
    return null;
  }

  const isActive = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      className={classes.link}
      data-active={isActive || undefined}
    >
      <item.Icon className={classes.linkIcon} />
      <span>{t(item.text)}</span>
    </Link>
  );
});
