import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Loader, Text } from '@mantine/core';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      className={className}
      opened={isOpen}
      onClose={onClose}
      title={<Text fw={700}>{t('Форма авторизации')}</Text>}
      centered
    >
      <Suspense fallback={<Loader type="dots" />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
