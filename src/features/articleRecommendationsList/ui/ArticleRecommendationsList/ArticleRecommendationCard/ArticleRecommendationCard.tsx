import { AspectRatio, Card, Image, Text, Title } from '@mantine/core';
import { memo } from 'react';

import { Article } from '@/entities/Article';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

import classes from './ArticleRecommendationCard.module.css';

interface ArticleRecommendationCardProps {
  article: Article;
  target?: HTMLAnchorElement['target'];
}

export const ArticleRecommendationCard = memo((props: ArticleRecommendationCardProps) => {
  const { article, target } = props;

  const typeArray = Array.isArray(article.type) ? article.type : [article.type];
  const topicText = typeArray.filter((t) => t !== 'ALL').join(', ');

  return (
    <AppLink
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classes.linkWrapper}
    >
      <Card radius="md" withBorder className={classes.card} h="100%"
p={{ base: 'xs', sm: 'md' }}>
        <Card.Section>
          <AspectRatio ratio={16 / 10}>
            <Image
              alt={article.title}
              src={article.img}
              fallbackSrc="https://placehold.co/600x400?text=Изображение+не+найдено"
            />
          </AspectRatio>
        </Card.Section>

        <Text fz="xs" c="dimmed" mt={{ base: 'xs', sm: 'md' }}>
          {topicText}
        </Text>

        <Title order={2} fz={{ base: 'sm', sm: 'md' }} mt={4} lineClamp={2}>
          {article.title}
        </Title>
      </Card>
    </AppLink>
  );
});
