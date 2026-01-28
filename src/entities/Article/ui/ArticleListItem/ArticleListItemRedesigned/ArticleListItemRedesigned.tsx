import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Group,
  Text,
  Skeleton,
  Image,
  AspectRatio,
  Title
} from '@mantine/core';
import { IconCalendar, IconEye, IconUser } from '@tabler/icons-react';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '../../../model/types/article';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import {
  ArticleBlockType,
  ArticleView
} from '../../../model/consts/articleConsts';
import classes from './ArticleListItemRedesigned.module.css';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

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
            <AppImage
              fallback={<Skeleton w="100%" h="100%" />}
              src={article.img}
              alt={article.title}
              className={classes.articleImage}
            />
          </div>

          <div className={classes.contentStack}>
            <div>
              <Text fz="md" fw={600} lineClamp={2} className={classes.articleTitle}>
                {article.title}
              </Text>

              {textBlock?.paragraphs && (
                <Text fz="sm" lineClamp={2} c="dimmed" mt="xs">
                  {textBlock.paragraphs.slice(0, 2).join(' ')}
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
              fallbackSrc="https://placehold.co/600x400?text=Изображение+не+найдено"
            />
          </AspectRatio>
        </Card.Section>

        <Title order={2} fz="md" mt="md" lineClamp={2}>
          {article.title}
        </Title>

        <Card.Section p="md" mt="auto">
          <Group>
            <Group gap={4}>
              <IconEye size={12} className={classes.metaIcon} />
              <Text fz="xs" c="dimmed">
                {String(article.views)}
              </Text>
            </Group>
            <Group gap={4}>
              <IconCalendar size={12} className={classes.metaIcon} />
              <Text fz="xs" c="dimmed">
                {article.createdAt}
              </Text>
            </Group>
            <Group gap={4}>
              <IconUser size={12} className={classes.metaIcon} />
              <Text fz="xs" c="dimmed">
                {article.user.username}
              </Text>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </AppLink>
  );
});
