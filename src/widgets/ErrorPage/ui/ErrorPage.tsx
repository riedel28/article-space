import { Box,Button, Container, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconAlertTriangle, IconHome,IconRefresh } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './ErrorPage.module.css';

export const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <Box className={cls.ErrorPage}>
      <Container size="sm">
        <Stack align="center" gap="xl">
          <ThemeIcon size={80} radius="xl" variant="light" color="red">
            <IconAlertTriangle size={48} />
          </ThemeIcon>

          <Stack align="center" gap="xs">
            <Title order={1} ta="center">
              {t('Произошла непредвиденная ошибка')}
            </Title>
            <Text c="dimmed" size="lg" ta="center" maw={500}>
              {t(
                'Произошла ошибка. Попробуйте обновить страницу или вернуться на главную.'
              )}
            </Text>
          </Stack>

          <Group>
            <Button variant="light" leftSection={<IconHome size={18} />} onClick={goHome}>
              {t('На главную')}
            </Button>
            <Button leftSection={<IconRefresh size={18} />} onClick={reloadPage}>
              {t('Обновить страницу')}
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};
