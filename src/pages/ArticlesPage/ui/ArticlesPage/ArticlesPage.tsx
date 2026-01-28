import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Affix, Box, Grid } from '@mantine/core';

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { view, onChangeView } = useArticleFilters();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 'content' }} pos="relative">
          <Box pos="relative" miw={40}>
            <Affix position={{ top: 76 }} withinPortal={false} visibleFrom="lg">
              <ArticleViewSelector view={view} onViewChange={onChangeView} />
            </Affix>
          </Box>
        </Grid.Col>
        <Grid.Col span="auto">
          <Page
            data-testid="ArticlesPage"
            onScrollEnd={onLoadNextPart}
            className={className}
          >
            <ArticleInfiniteList />
          </Page>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 3 }} pos="relative">
          <Affix position={{ top: 76 }} withinPortal={false} visibleFrom="lg">
            <FiltersContainer />
          </Affix>
        </Grid.Col>
      </Grid>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ScrollToTopButton />
      </Affix>
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;
