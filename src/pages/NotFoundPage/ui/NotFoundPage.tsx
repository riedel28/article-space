import { Box, Button, Container, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconArrowLeft, IconHome, IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getRouteMain } from '@/shared/const/router';

import cls from './NotFoundPage.module.css';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goHome = () => {
    navigate(getRouteMain());
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box data-testid="NotFoundPage" className={`${cls.NotFoundPage} ${className ?? ''}`}>
      <Container size="sm">
        <Stack align="center" gap="xl">
          <ThemeIcon radius="xl" size="xl" variant="light">
            <IconSearch size={24} className={cls.icon} />
          </ThemeIcon>

          <Text className={cls.errorCode}>404</Text>

          <Stack align="center" gap="xs">
            <Title order={1} ta="center">
              {t('Страница не найдена')}
            </Title>
            <Text c="dimmed" size="lg" ta="center" maw={500}>
              {t(
                'Страница, которую вы ищете, не существует или была перемещена. Проверьте URL или вернитесь на главную.'
              )}
            </Text>
          </Stack>

          <Group>
            <Button variant="light" leftSection={<IconArrowLeft size={18} />} onClick={goBack}>
              {t('Назад')}
            </Button>
            <Button leftSection={<IconHome size={18} />} onClick={goHome}>
              {t('На главную')}
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};
