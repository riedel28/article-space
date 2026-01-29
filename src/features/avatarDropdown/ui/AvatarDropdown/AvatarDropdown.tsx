import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions
} from '@/entities/User';
import { getRouteProfile } from '@/shared/const/router';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

export const AvatarDropdown = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Menu position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          size="lg"
          radius="xl"
          aria-label={t('User menu')}
        >
          <Avatar size={36} src={authData.avatar} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown w={120}>
        <Menu.Item onClick={() => navigate(getRouteProfile(authData.id))}>
          {t('Профиль')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={onLogout}>{t('Выйти')}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});
