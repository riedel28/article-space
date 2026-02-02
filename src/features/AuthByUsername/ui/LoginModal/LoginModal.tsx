import { Drawer, em, Modal, Skeleton, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

const LoginFormSkeleton = () => (
  <Stack gap="lg">
    <Stack gap={4}>
      <Skeleton height={16} width={120} />
      <Skeleton height={36} />
    </Stack>
    <Stack gap={4}>
      <Skeleton height={16} width={60} />
      <Skeleton height={36} />
    </Stack>
    <Skeleton height={36} mt="xs" />
  </Stack>
);

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const title = (
    <Stack gap={4}>
      <Title fw={600} order={2} fz="lg">
        {t('Добро пожаловать')}
      </Title>
      <Text size="sm" c="dimmed">
        {t('Введите свои данные для входа')}
      </Text>
    </Stack>
  );

  const content = (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginFormAsync onSuccess={onClose} />
    </Suspense>
  );

  if (isMobile) {
    return (
      <Drawer
        className={className}
        opened={isOpen}
        onClose={onClose}
        title={title}
        position="bottom"
        size="auto"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Modal
      className={className}
      opened={isOpen}
      onClose={onClose}
      title={title}
      centered
    >
      {content}
    </Modal>
  );
};
