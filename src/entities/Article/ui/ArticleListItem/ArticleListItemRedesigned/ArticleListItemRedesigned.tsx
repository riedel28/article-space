import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Group, Text, Image, AspectRatio, Title } from '@mantine/core';
import { IconCalendar, IconEye, IconUser } from '@tabler/icons-react';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '../../../model/types/article';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import {
  ArticleBlockType,
  ArticleView
} from '../../../model/consts/articleConsts';
import { IMAGE_FALLBACK_URL } from '@/shared/const/common';
import classes from './ArticleListItemRedesigned.module.css';

/**
 * Extracts plain text preview from article content or blocks
 */
function getArticlePreview(article: ArticleListItemProps['article']): string {
  // Try to get preview from content (HTML)
  if (article.content) {
    // Strip HTML tags and get first 200 characters
    const text = article.content.replace(/<[^>]*>/g, ' ').trim();
    return text.slice(0, 200);
  }

  // Fallback to blocks for backwards compatibility
  if (article.blocks) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock | undefined;
    if (textBlock?.paragraphs) {
      return textBlock.paragraphs.slice(0, 2).join(' ');
    }
  }

  return '';
}

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

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
            />
          </div>

          <div className={classes.contentStack}>
            <div>
              <Text
                fz="md"
                fw={600}
                lineClamp={2}
                className={classes.articleTitle}
              >
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
