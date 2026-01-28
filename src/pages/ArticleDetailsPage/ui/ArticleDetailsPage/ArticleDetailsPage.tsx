import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Stack,
  Box,
  Skeleton,
  Affix,
  Divider
} from '@mantine/core';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import classes from './ArticleDetailsPage.module.css';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleRating } from '@/features/articleRating';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import {
  getArticleDetailsData,
  getArticleDetailsIsLoading
} from '@/entities/Article';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

type ArticleDetailsPageProps = object;

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailsPage = (_props: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);

  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Box className={classes.page}>
        <Container size="lg">
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
