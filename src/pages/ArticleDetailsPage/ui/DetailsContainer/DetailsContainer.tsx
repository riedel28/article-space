import { Badge, Box, Card,Skeleton, Stack, Text, Title } from '@mantine/core';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  ArticleDetails,
  getArticleDetailsData,
  getArticleDetailsIsLoading
} from '@/entities/Article';

import cls from './DetailsContainer.module.css';

interface DetailsContainerProps {
  className?: string;
}

const DetailsContainerSkeleton = () => (
  <Stack gap="md">
    <Skeleton height={24} width={80} radius="xl" />
    <Skeleton height={40} width="70%" />
    <Skeleton height={24} width="50%" />
  </Stack>
);

export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);

  return (
    <Card p={{ base: 0, sm: 'lg' }} radius="lg" className={className}>
      <Stack gap="lg">
        {isLoading ? (
          <DetailsContainerSkeleton />
        ) : (
          <>
            {article?.type && (
              <Badge variant="light" size="lg">
                {Array.isArray(article.type) ? article.type[0] : article.type}
              </Badge>
            )}

            {article?.title && (
              <Title order={1} size="h1">
                {article.title}
              </Title>
            )}

            {article?.subtitle && (
              <Text c="dimmed" size="lg">
                {article.subtitle}
              </Text>
            )}
          </>
        )}

        <Box className={cls.articleDetailsWrapper}>
          <ArticleDetails id={id} />
        </Box>
      </Stack>
    </Card>
  );
});
