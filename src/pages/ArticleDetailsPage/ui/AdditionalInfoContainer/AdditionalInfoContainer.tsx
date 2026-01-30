import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Stack,
  Group,
  Text,
  Divider,
  Avatar,
  Button,
  ThemeIcon,
  Skeleton
} from '@mantine/core';
import { IconEye, IconCalendar, IconPencil } from '@tabler/icons-react';
import { getArticleDetailsData, getArticleDetailsIsLoading } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';
import { getCanEditArticle } from '../../model/selectors/article';
import classes from './AdditionalInfoContainer.module.css';

const AdditionalInfoSkeleton = () => (
  <Stack gap="md">
    <Group gap="sm">
      <Skeleton height={28} width={28} radius="md" />
      <Skeleton height={16} width={100} />
    </Group>

    <Group gap="sm">
      <Skeleton height={28} width={28} radius="md" />
      <Skeleton height={16} width={80} />
    </Group>

    <Divider />

    <Group gap="sm">
      <Skeleton height={38} width={38} circle />
      <Skeleton height={16} width={100} />
    </Group>
  </Stack>
);

export const AdditionalInfoContainer = memo(() => {
  const { t } = useTranslation();
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const canEdit = useSelector(getCanEditArticle);
  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (isLoading) {
    return (
      <Card p="lg" radius="lg" className={classes.card}>
        <AdditionalInfoSkeleton />
      </Card>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <Card p="lg" radius="lg" withBorder className={classes.card}>
      <Stack gap="lg">
        <Group gap="sm">
          <ThemeIcon variant="light" color="brand" size="lg">
            <IconEye size={16} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm">{article.views}</Text>
            <Text c="dimmed" size="sm">
              {t('просмотров')}
            </Text>
          </Stack>
        </Group>

        <Group gap="sm">
          <ThemeIcon variant="light" color="brand" size="lg">
            <IconCalendar size={16} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm">{article.createdAt}</Text>
            <Text c="dimmed" size="sm">
              {t('опубликовано')}
            </Text>
          </Stack>
        </Group>

        <Divider />

        <Group gap="sm">
          <Avatar src={article.user.avatar} size="md" radius="xl" />
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              {article.user.username}
            </Text>
            <Text c="dimmed" size="sm">
              {t('автор')}
            </Text>
          </Stack>
        </Group>

        {canEdit && (
          <>
            <Divider />
            <Button
              fullWidth
              variant="light"
              leftSection={<IconPencil size={16} />}
              onClick={onEditArticle}
              className={classes.editButton}
            >
              {t('Редактировать')}
            </Button>
          </>
        )}
      </Stack>
    </Card>
  );
});
