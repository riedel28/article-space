import { ActionIcon,Menu } from '@mantine/core';
import { IconLogout,IconUser } from '@tabler/icons-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserAuthData, userActions } from '@/entities/User';
import { supabase } from '@/shared/api/supabase';
import { getRouteProfile } from '@/shared/const/router';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

export const AvatarDropdown = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  return (
    <Menu position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg" radius="xl" aria-label={t('Меню пользователя')}>
          <Avatar size={36} src={authData.avatar} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown w={140}>
        <Menu.Item
          leftSection={<IconUser size={16} />}
          onClick={() => navigate(getRouteProfile(authData.id))}
        >
          {t('Профиль')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout size={16} />} onClick={onLogout}>
          {t('Выйти')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});
