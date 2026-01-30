import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title} from '@mantine/core';
import { IconDeviceFloppy, IconPencil } from '@tabler/icons-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileFormValues,useProfileForm } from '../../model/lib/useProfileForm';
import { Profile } from '../../model/types/profile';
import classes from './ProfileCardRedesigned.module.css';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  isUpdating?: boolean;
  canEdit?: boolean;
  onSubmit?: (values: ProfileFormValues) => void;
  onCancel?: () => void;
  onEdit?: () => void;
}

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <Group justify="center" w="100%">
      <Stack align="center" gap="xs">
        <Title order={3} c="red.6" ta="center">
          {t('Произошла ошибка при загрузке профиля')}
        </Title>
        <Text c="red.5" ta="center">
          {t('Попробуйте обновить страницу')}
        </Text>
      </Stack>
    </Group>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding="lg" radius="lg" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <Group gap="md" align="center">
            <Skeleton circle height={64} width={64} />
            <Stack gap={4}>
              <Skeleton height={24} width={150} />
              <Skeleton height={16} width={200} />
            </Stack>
          </Group>
          <Skeleton height={36} width={80} />
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Stack gap={4}>
            <Skeleton height={14} width={80} />
            <Skeleton height={20} width={120} />
          </Stack>
          <Stack gap={4}>
            <Skeleton height={14} width={80} />
            <Skeleton height={20} width={120} />
          </Stack>
          <Stack gap={4}>
            <Skeleton height={14} width={80} />
            <Skeleton height={20} width={120} />
          </Stack>
          <Stack gap={4}>
            <Skeleton height={14} width={80} />
            <Skeleton height={20} width={180} />
          </Stack>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

interface InfoFieldProps {
  label: string;
  value?: string;
  truncate?: boolean;
}

const InfoField = ({ label, value, truncate }: InfoFieldProps) => (
  <Stack gap={4}>
    <Text size="sm" c="dimmed">
      {label}
    </Text>
    <Text size="md" fw={500} truncate={truncate ? 'end' : undefined}>
      {value || '—'}
    </Text>
  </Stack>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const { className, data, readonly, isUpdating, canEdit, onSubmit, onCancel, onEdit } = props;
  const { t } = useTranslation('profile');

  const form = useProfileForm({
    initialValues: {
      first: data?.first ?? '',
      lastname: data?.lastname ?? '',
      username: data?.username ?? '',
      avatar: data?.avatar ?? ''
    }
  });

  const handleSubmit = useCallback(
    (values: ProfileFormValues) => {
      onSubmit?.(values);
    },
    [onSubmit]
  );

  const renderViewMode = () => (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
        <Group gap="md" align="center">
          <Box className={data?.avatar ? classes.avatarBorder : undefined}>
            <Avatar size={64} src={data?.avatar} radius="50%" />
          </Box>
          <Box>
            <Title order={2}>
              {data?.first} {data?.lastname}
            </Title>
            <Text c="dimmed" size="sm">
              @{data?.username}
            </Text>
          </Box>
        </Group>
        {canEdit && (
          <Button
            variant="light"
            leftSection={<IconPencil size={18} />}
            onClick={onEdit}
            data-testid="ProfileCard.EditButton"
          >
            {t('Редактировать')}
          </Button>
        )}
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <InfoField label={t('Ваше имя')} value={data?.first} />
        <InfoField label={t('Ваша фамилия')} value={data?.lastname} />
        <InfoField label={t('Имя пользователя')} value={data?.username} />
        <InfoField label={t('Введите ссылку на аватар')} value={data?.avatar} truncate />
      </SimpleGrid>
    </Stack>
  );

  const renderEditMode = () => (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        <Group gap="md" align="center">
          <Box className={data?.avatar ? classes.avatarBorder : undefined}>
            <Avatar size={64} src={data?.avatar} radius="50%" />
          </Box>
          <Box>
            <Title order={2}>{t('Редактировать профиль')}</Title>
            <Text c="dimmed" size="sm">
              {t('Обновите свою личную информацию')}
            </Text>
          </Box>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput
            label={t('Ваше имя')}
            placeholder={t('Введите имя')}
            withAsterisk
            data-testid="ProfileCard.firstname"
            {...form.getInputProps('first')}
          />

          <TextInput
            label={t('Ваша фамилия')}
            placeholder={t('Введите фамилию')}
            withAsterisk
            data-testid="ProfileCard.lastname"
            {...form.getInputProps('lastname')}
          />

          <TextInput
            label={t('Имя пользователя')}
            placeholder={t('Введите имя пользователя')}
            withAsterisk
            data-testid="ProfileCard.username"
            {...form.getInputProps('username')}
          />

          <TextInput
            label={t('Ссылка на аватар')}
            placeholder="https://..."
            data-testid="ProfileCard.avatar"
            {...form.getInputProps('avatar')}
          />
        </SimpleGrid>

        <Group justify="flex-end" mt="md" wrap="wrap" gap="sm">
          <Button variant="default" onClick={onCancel} data-testid="ProfileCard.CancelButton">
            {t('Отменить')}
          </Button>
          <Button
            type="submit"
            loading={isUpdating}
            data-testid="ProfileCard.SaveButton"
            leftSection={<IconDeviceFloppy size={18} />}
          >
            {t('Сохранить')}
          </Button>
        </Group>
      </Stack>
    </form>
  );

  return (
    <Card padding="lg" radius="lg" withBorder className={className}>
      {readonly ? renderViewMode() : renderEditMode()}
    </Card>
  );
});
