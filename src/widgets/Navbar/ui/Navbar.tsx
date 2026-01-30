import { Burger, Button, Group } from '@mantine/core';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';

import classes from './Navbar.module.css';

interface NavbarProps {
  opened?: boolean;
  toggle?: () => void;
}

export const Navbar = memo(({ opened, toggle }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <Group h="100%" px="md" justify="flex-end" className={classes.header}
data-testid="Navbar">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"
data-testid="sidebar-toggle" />
      <Group ml="auto">
        {authData ? (
          <>
            <NotificationButton />
            <AvatarDropdown />
          </>
        ) : (
          <>
            <Button variant="subtle" onClick={onShowModal}>
              {t('Войти')}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
          </>
        )}
      </Group>
    </Group>
  );
});
