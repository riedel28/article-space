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
  const { t } = useTranslation();

  return (
    <Group justify="center" w="100%">
      <Stack align="center" gap="xs">
        <Title order={3} c="red.6" ta="center">
          {t('An error occurred while loading the profile')}
        </Title>
        <Text c="red.5" ta="center">
          {t('Please try refreshing the page')}
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
            {t('Edit')}
          </Button>
        )}
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <InfoField label={t('First Name')} value={data?.first} />
        <InfoField label={t('Last Name')} value={data?.lastname} />
        <InfoField label={t('Username')} value={data?.username} />
        <InfoField label={t('Avatar URL')} value={data?.avatar} truncate />
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
            <Title order={2}>{t('Edit Profile')}</Title>
            <Text c="dimmed" size="sm">
              {t('Update your personal information')}
            </Text>
          </Box>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput
            label={t('First Name')}
            placeholder={t('Enter your first name')}
            withAsterisk
            data-testid="ProfileCard.firstname"
            {...form.getInputProps('first')}
          />

          <TextInput
            label={t('Last Name')}
            placeholder={t('Enter your last name')}
            withAsterisk
            data-testid="ProfileCard.lastname"
            {...form.getInputProps('lastname')}
          />

          <TextInput
            label={t('Username')}
            placeholder={t('Enter your username')}
            withAsterisk
            data-testid="ProfileCard.username"
            {...form.getInputProps('username')}
          />

          <TextInput
            label={t('Avatar URL')}
            placeholder="https://..."
            data-testid="ProfileCard.avatar"
            {...form.getInputProps('avatar')}
          />
        </SimpleGrid>

        <Group justify="flex-end" mt="md" wrap="wrap" gap="sm">
          <Button variant="default" onClick={onCancel} data-testid="ProfileCard.CancelButton">
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            loading={isUpdating}
            data-testid="ProfileCard.SaveButton"
            leftSection={<IconDeviceFloppy size={18} />}
          >
            {t('Save changes')}
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
