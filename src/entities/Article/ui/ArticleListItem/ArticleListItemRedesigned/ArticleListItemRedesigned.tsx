import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Stack, Group, Text, Avatar, Button, Skeleton } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '../../../model/types/article';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import {
  ArticleBlockType,
  ArticleView
} from '../../../model/consts/articleConsts';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} ml={8} />
      <Text fw={700}>{article.user.username}</Text>
    </>
  );

  const views = (
    <Group gap="xs">
      <IconEye size={20} />
      <Text>{String(article.views)}</Text>
    </Group>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <Card
        padding="xl"
        data-testid="ArticleListItem"
        className={className}
        w="100%"
        shadow="sm"
        radius="md"
        withBorder
      >
        <Stack gap="lg">
          <Group gap="sm" wrap="nowrap">
            <Avatar size={40} src={article.user.avatar} />
            <Stack gap={2}>
              <Text fw={600} size="sm">
                {article.user.username}
              </Text>
              <Text size="xs" c="dimmed">
                {article.createdAt}
              </Text>
            </Stack>
          </Group>

          <Stack gap="xs">
            <Text size="xl" fw={700}>
              {article.title}
            </Text>
            <Text size="md" c="dimmed">
              {article.subtitle}
            </Text>
          </Stack>

          <AppImage
            fallback={<Skeleton width="100%" height={300} radius="md" />}
            src={article.img}
            alt={article.title}
            style={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 'var(--mantine-radius-md)'
            }}
          />

          {textBlock?.paragraphs && (
            <Text size="sm" lineClamp={3} c="dimmed">
              {textBlock.paragraphs.slice(0, 2).join(' ')}
            </Text>
          )}

          <Group justify="space-between" mt="md">
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button variant="light" size="md">
                {t('Читать далее...')}
              </Button>
            </AppLink>
            {views}
          </Group>
        </Stack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={className}
      style={{ display: 'block', height: '100%' }}
    >
      <Card
        padding={0}
        h="100%"
        shadow="sm"
        radius="md"
        withBorder
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer'
        }}
        styles={{
          root: {
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 'var(--mantine-shadow-md)'
            }
          }
        }}
      >
        <AppImage
          fallback={<Skeleton width="100%" height={180} />}
          alt={article.title}
          src={article.img}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
        />
        <Stack gap="xs" p="md" style={{ flexGrow: 1, display: 'flex' }}>
          <Text fw={600} lineClamp={2} size="md">
            {article.title}
          </Text>
          <Stack
            gap="sm"
            style={{ marginTop: 'auto' }}
          >
            <Group justify="space-between" wrap="nowrap">
              <Text size="xs" c="dimmed">
                {article.createdAt}
              </Text>
              <Group gap={4}>
                <IconEye size={16} opacity={0.6} />
                <Text size="xs" c="dimmed">
                  {String(article.views)}
                </Text>
              </Group>
            </Group>
            <Group gap="xs" wrap="nowrap">
              <Avatar size={24} src={article.user.avatar} />
              <Text size="sm" fw={500} lineClamp={1}>
                {article.user.username}
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Card>
    </AppLink>
  );
});
