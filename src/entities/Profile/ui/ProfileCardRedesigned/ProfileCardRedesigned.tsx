import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Stack,
  Group,
  Avatar,
  TextInput,
  Skeleton,
  Text,
  Title,
  Divider,
  Paper,
  Box
} from '@mantine/core';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation();

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
    <Card padding="xl" shadow="sm" radius="md" withBorder
w="100%">
      <Stack gap={40}>
        <Group justify="center" w="100%">
          <Skeleton circle height={140} />
        </Group>
        <Stack gap={24}>
          <Skeleton height={12} width={120} />
          <Group gap={24} w="100%" align="flex-start" wrap="wrap">
            <Stack gap={16} style={{ flex: 1, minWidth: 280 }}>
              <Skeleton height={56} />
              <Skeleton height={56} />
              <Skeleton height={56} />
              <Skeleton height={56} />
            </Stack>

            <Stack gap={16} style={{ flex: 1, minWidth: 280 }}>
              <Skeleton height={56} />
              <Skeleton height={56} />
              <Skeleton height={56} />
              <Skeleton height={56} />
            </Stack>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency
  } = props;
  const { t } = useTranslation('profile');

  return (
    <Card padding="xl" shadow="sm" radius="md" withBorder
w="100%" className={className}>
      <Stack gap={40}>
        {/* Avatar Section */}
        <Box>
          <Group justify="center" w="100%" mb="md">
            <Avatar size={140} src={data?.avatar} radius="50%" />
          </Group>
          {data?.username && (
            <Text size="xl" fw={600} ta="center" c="dimmed">
              @{data.username}
            </Text>
          )}
        </Box>

        <Divider />

        {/* Personal Information Section */}
        <Stack gap={20}>
          <Title order={4} size="h5" fw={600}>
            {t('Личная информация')}
          </Title>
          <Paper p="md" radius="md" withBorder bg="gray.0"
style={{ borderStyle: 'dashed' }}>
            <Group gap={24} w="100%" align="flex-start" wrap="wrap">
              <Stack gap={16} style={{ flex: 1, minWidth: 280 }}>
                <TextInput
                  value={data?.first}
                  label={t('Имя')}
                  placeholder={t('Введите имя')}
                  onChange={(e) => onChangeFirstname?.(e.currentTarget.value)}
                  readOnly={readonly}
                  data-testid="ProfileCard.firstname"
                  size="md"
                  styles={{ input: { fontWeight: readonly ? 400 : 500 } }}
                />
                <TextInput
                  value={data?.lastname}
                  label={t('Фамилия')}
                  placeholder={t('Введите фамилию')}
                  onChange={(e) => onChangeLastname?.(e.currentTarget.value)}
                  readOnly={readonly}
                  data-testid="ProfileCard.lastname"
                  size="md"
                  styles={{ input: { fontWeight: readonly ? 400 : 500 } }}
                />
              </Stack>

              <Stack gap={16} style={{ flex: 1, minWidth: 280 }}>
                <TextInput
                  value={data?.age}
                  label={t('Возраст')}
                  placeholder={t('Введите возраст')}
                  onChange={(e) => onChangeAge?.(e.currentTarget.value)}
                  readOnly={readonly}
                  type="number"
                  size="md"
                  styles={{ input: { fontWeight: readonly ? 400 : 500 } }}
                />
                <TextInput
                  value={data?.city}
                  label={t('Город')}
                  placeholder={t('Введите город')}
                  onChange={(e) => onChangeCity?.(e.currentTarget.value)}
                  readOnly={readonly}
                  size="md"
                  styles={{ input: { fontWeight: readonly ? 400 : 500 } }}
                />
              </Stack>
            </Group>
          </Paper>
        </Stack>

        <Divider />

        {/* Account & Preferences Section */}
        <Stack gap={20}>
          <Title order={4} size="h5" fw={600}>
            {t('Настройки аккаунта')}
          </Title>
          <Paper p="md" radius="md" withBorder bg="gray.0"
style={{ borderStyle: 'dashed' }}>
            <Group gap={24} w="100%" align="flex-start" wrap="wrap">
              <Stack gap={16} style={{ flex: 1, minWidth: 280 }}>
                <TextInput
                  value={data?.username}
                  label={t('Имя пользователя')}
                  placeholder={t('Введите имя пользователя')}
                  onChange={(e) => onChangeUsername?.(e.currentTarget.value)}
                  readOnly={readonly}
                  size="md"
                  styles={{ input: { fontWeight: readonly ? 400 : 500 } }}
                />
                <TextInput
                  value={data?.avatar}
                  label={t('Cсылка на аватар')}
                  placeholder="https://..."
                  onChange={(e) => onChangeAvatar?.(e.currentTarget.value)}
                  readOnly={readonly}
                  size="md"
                  styles={{ input: { fontWeight: readonly ? 400 : 500 } }}
                />
              </Stack>

              <Stack gap={16} style={{ flex: 1, minWidth: 280 }}>
                <CurrencySelect
                  value={data?.currency}
                  onChange={onChangeCurrency}
                  readonly={readonly}
                />
                <CountrySelect
                  value={data?.country}
                  onChange={onChangeCountry}
                  readonly={readonly}
                />
              </Stack>
            </Group>
          </Paper>
        </Stack>
      </Stack>
    </Card>
  );
});
