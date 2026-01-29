import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Loader, Text, Title, Stack } from '@mantine/core';
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
      title={
        <Stack gap={4}>
          <Title fw={600} order={2} fz="lg">
            {t('Добро пожаловать')}
          </Title>
          <Text size="sm" c="dimmed">
            {t('Введите свои данные для входа')}
          </Text>
        </Stack>
      }
      centered
    >
      <Suspense fallback={<Loader type="dots" />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
