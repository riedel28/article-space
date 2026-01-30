import { Affix, Box, Button, Collapse, Flex, Stack, Text, Title } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import classes from './ArticlesPage.module.css';

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
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { t } = useTranslation();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Flex gap="lg">
        <Box pos="relative" miw={40} visibleFrom="lg">
          <Box pos="sticky" top={76}>
            <ArticleViewSelector view={view} onViewChange={onChangeView} />
          </Box>
        </Box>
        <Box flex={1} miw={0}>
          <Page data-testid="ArticlesPage" onScrollEnd={onLoadNextPart} className={className}>
            <Stack gap="md" hiddenFrom="lg" mb="lg">
              <Box>
                <Title order={2}>{t('Статьи')}</Title>
                <Text c="dimmed">
                  {t('Просматривайте нашу коллекцию статей на различные темы')}
                </Text>
              </Box>
              <Button
                variant="default"
                leftSection={<IconAdjustments size={18} />}
                onClick={() => setFiltersOpen((o) => !o)}
                fullWidth
              >
                {filtersOpen ? t('Скрыть фильтры') : t('Показать фильтры')}
              </Button>
              <Collapse in={filtersOpen}>
                <FiltersContainer />
              </Collapse>
            </Stack>
            <ArticleInfiniteList />
          </Page>
        </Box>
        <Box w={300} className={classes.filterColumn} visibleFrom="lg" pr="md">
          <Box pos="sticky" top={76} mah="calc(100vh - 96px)" className={classes.filterContainer}>
            <FiltersContainer />
          </Box>
        </Box>
      </Flex>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ScrollToTopButton />
      </Affix>
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;
