import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  ThemeIcon,
  Box
} from '@mantine/core';
import { IconAlertTriangle, IconRefresh, IconHome } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import cls from './ErrorPage.module.css';

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
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
              {t('Что-то пошло не так')}
            </Title>
            <Text c="dimmed" size="lg" ta="center" maw={500}>
              {t(
                'Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную.'
              )}
            </Text>
          </Stack>

          <Group>
            <Button
              variant="light"
              leftSection={<IconHome size={18} />}
              onClick={goHome}
            >
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
