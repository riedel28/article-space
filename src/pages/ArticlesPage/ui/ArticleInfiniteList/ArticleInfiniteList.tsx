import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);
  const { t } = useTranslation();

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={20} />} title={t('Ошибка')} color="red" radius="md">
        {t('Ошибка при загрузке статей')}
      </Alert>
    );
  }

  return (
    <ArticleList isLoading={isLoading} view={view} articles={articles} className={className} />
  );
});
