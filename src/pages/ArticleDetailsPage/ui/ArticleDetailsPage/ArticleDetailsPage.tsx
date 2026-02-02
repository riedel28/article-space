import {
  Affix,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Skeleton,
  Stack,
  Text
} from '@mantine/core';
import { IconCalendar, IconEye } from '@tabler/icons-react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getArticleDetailsData, getArticleDetailsIsLoading } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

import { articleDetailsPageReducer } from '../../model/slices';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import classes from './ArticleDetailsPage.module.css';

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);

  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Box className={classes.page}>
        <Container size="lg" px="xs">
          <ArticleDetailsPageHeader />

          <Box className={classes.heroImageWrapper} my="md">
            {isLoading || !article?.img ? (
              <Skeleton h="100%" w="100%" />
            ) : (
              <AppImage
                src={article.img}
                alt={article.title}
                className={classes.heroImage}
                fallback={<Skeleton h="100%" w="100%" />}
              />
            )}
          </Box>

          {/* Mobile article info bar - hidden on lg screens */}
          <Box hiddenFrom="lg" mb="md">
            {isLoading && (
              <Group gap="md">
                <Skeleton h={20} w={80} />
                <Skeleton h={20} w={100} />
                <Skeleton h={24} w={24} circle />
                <Skeleton h={20} w={80} />
              </Group>
            )}
            {!isLoading && article && (
              <Group gap="md" className={classes.mobileInfoBar}>
                <Group gap={4}>
                  <IconEye size={16} color="var(--mantine-color-dimmed)" />
                  <Text size="sm" c="dimmed">
                    {article.views}
                  </Text>
                </Group>
                <Group gap={4}>
                  <IconCalendar size={16} color="var(--mantine-color-dimmed)" />
                  <Text size="sm" c="dimmed">
                    {article.createdAt}
                  </Text>
                </Group>
                <Divider orientation="vertical" />
                <Group gap="xs">
                  <Avatar src={article.user.avatar} size="sm" radius="xl" />
                  <Text size="sm" fw={500}>
                    {article.user.username}
                  </Text>
                </Group>
              </Group>
            )}
          </Box>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Stack gap="lg" mb="xl">
                <DetailsContainer />
                <Divider />
                <ArticleRating articleId={id} />
                <Divider />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }} visibleFrom="lg">
              <Box className={classes.sidebarSticky}>
                <AdditionalInfoContainer />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ScrollToTopButton />
      </Affix>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
