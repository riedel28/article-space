import { memo } from 'react';
import { Card, Text, Image, AspectRatio, Title } from '@mantine/core';
import { Article } from '@/entities/Article';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import classes from './ArticleRecommendationCard.module.css';

interface ArticleRecommendationCardProps {
  article: Article;
  target?: HTMLAnchorElement['target'];
}

export const ArticleRecommendationCard = memo(
  (props: ArticleRecommendationCardProps) => {
    const { article, target } = props;

    const topicText = article.type.filter((t) => t !== 'ALL').join(', ');

    return (
      <AppLink
        target={target}
        to={getRouteArticleDetails(article.id)}
        className={classes.linkWrapper}
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

          <Text fz="xs" c="dimmed" mt="md">
            {topicText}
          </Text>

          <Title order={2} fz="md" mt={4} lineClamp={2}>
            {article.title}
          </Title>
        </Card>
      </AppLink>
    );
  }
);
