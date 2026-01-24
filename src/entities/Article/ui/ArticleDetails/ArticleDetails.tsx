import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Stack, Skeleton, Center, Box } from '@mantine/core';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/redesigned/Text';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails';
import { renderArticleBlock } from './renderBlock';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.title} size="l" bold />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={<Skeleton width="100%" height={420} radius="md" />}
        src={article?.img}
        style={{ width: '100%', maxHeight: 420 }}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetailsSkeleton = () => {
  return (
    <Stack gap="md" w="100%">
      <Center>
        <Skeleton width={200} height={200} circle />
      </Center>
      <Skeleton width={300} height={32} />
      <Skeleton width={600} height={24} />
      <Skeleton width="100%" height={200} />
      <Skeleton width="100%" height={200} />
    </Stack>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text align="center" title={t('Произошла ошибка при загрузке статьи.')} />
    );
  } else {
    content = <Redesigned />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Box mih="100vh" className={className}>
        <Stack gap="md" w="100%">
          {content}
        </Stack>
      </Box>
    </DynamicModuleLoader>
  );
});
