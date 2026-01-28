import { useTranslation } from 'react-i18next';
import { Box, Title, SimpleGrid } from '@mantine/core';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi';
import { ArticleRecommendationCard } from './ArticleRecommendationCard/ArticleRecommendationCard';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      isLoading,
      data: articles,
      error
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      <Box
        className={classNames('', {}, [className])}
        data-testid="ArticleRecommendationsList"
      >
        <Title order={4} fz="xl" mb="md">
          {t('Рекомендуем')}
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {articles.map((article) => (
            <ArticleRecommendationCard
              key={article.id}
              article={article}
              target="_blank"
            />
          ))}
        </SimpleGrid>
      </Box>
    );
  }
);
