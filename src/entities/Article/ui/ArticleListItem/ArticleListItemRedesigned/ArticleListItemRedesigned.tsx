import { AspectRatio, Card, Group, Image, Text, Title } from '@mantine/core';
import { IconCalendar, IconEye, IconUser } from '@tabler/icons-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { IMAGE_FALLBACK_URL } from '@/shared/const/common';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

import { ArticleView } from '../../../model/consts/articleConsts';
import { ArticleListItemProps } from '../ArticleListItem';
import classes from './ArticleListItemRedesigned.module.css';

/**
 * Extracts plain text preview from article content
 */
function getArticlePreview(article: ArticleListItemProps['article']): string {
  if (article.content) {
    // Strip HTML tags and get first 200 characters
    const text = article.content.replace(/<[^>]*>/g, ' ').trim();
    return text.slice(0, 200);
  }
  return '';
}

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, index = 0 } = props;
  const { t } = useTranslation();
  const isFirstImage = index === 0;

  if (view === ArticleView.BIG) {
    const preview = getArticlePreview(article);

    return (
      <Card
        data-testid="ArticleListItem"
        className={`${className} ${classes.cardBig}`}
        w="100%"
        radius="md"
        withBorder
      >
        <div className={classes.cardBigContainer}>
          <div className={classes.imageContainer}>
            <Image
              src={article.img}
              alt={article.title}
              className={classes.articleImage}
              fallbackSrc={IMAGE_FALLBACK_URL}
              loading={isFirstImage ? 'eager' : 'lazy'}
              fetchPriority={isFirstImage ? 'high' : undefined}
            />
          </div>

          <div className={classes.contentStack}>
            <div>
              <Text fz="md" fw={600} lineClamp={2} className={classes.articleTitle}>
                {article.title}
              </Text>

              {preview && (
                <Text fz="sm" lineClamp={2} c="dimmed" mt="xs">
                  {preview}
                </Text>
              )}

              <AppLink
                target={target}
                to={getRouteArticleDetails(article.id)}
                className={classes.readMoreLink}
              >
                <Text fz="sm" fw={500} mt="xs">
                  {t('Читать далее')}
                </Text>
              </AppLink>
            </div>

            <Group gap="md" mt="md" wrap="wrap">
              <Group gap={6}>
                <IconEye size={14} className={classes.metaIcon} />
                <Text fz="xs" c="dimmed">
                  {String(article.views)} {t('views')}
                </Text>
              </Group>
              <Group gap={6}>
                <IconCalendar size={14} className={classes.metaIcon} />
                <Text fz="xs" c="dimmed">
                  {article.createdAt}
                </Text>
              </Group>
              <Group gap={6}>
                <IconUser size={14} className={classes.metaIcon} />
                <Text fz="xs" c="dimmed">
                  {article.user.username}
                </Text>
              </Group>
            </Group>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={`${className} ${classes.linkWrapper}`}
    >
      <Card radius="md" withBorder className={classes.card} h="100%">
        <Card.Section>
          <AspectRatio ratio={16 / 10}>
            <Image
              alt={article.title}
              src={article.img}
              h={180}
              fallbackSrc={IMAGE_FALLBACK_URL}
              loading={isFirstImage ? 'eager' : 'lazy'}
              fetchPriority={isFirstImage ? 'high' : undefined}
            />
          </AspectRatio>
        </Card.Section>

        <Title order={2} fz="md" mt="md" lineClamp={2}>
          {article.title}
        </Title>

        <Card.Section p="md" mt="auto">
          <Group gap="xs" wrap="nowrap">
            <Group gap={4} wrap="nowrap" c="dimmed">
              <IconEye size={14} />
              <Text fz="xs">{String(article.views)}</Text>
            </Group>
            <Group gap={4} wrap="nowrap" c="dimmed">
              <IconCalendar size={14} />
              <Text fz="xs">{article.createdAt}</Text>
            </Group>
            <Group gap={4} wrap="nowrap" c="dimmed">
              <IconUser size={14} />
              <Text fz="xs" truncate>
                {article.user.username}
              </Text>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </AppLink>
  );
});
