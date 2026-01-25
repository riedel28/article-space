import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Burger, Button, Group } from '@mantine/core';

import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';

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
    <Group h="100%" px="md" justify="space-between">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
            {isAuthModal && (
              <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
          </>
        )}
      </Group>
    </Group>
  );
});
