import {
  Alert,
  Box,
  Image,
  Skeleton,
  Stack,
  Text,
  Title,
  TypographyStylesProvider
} from '@mantine/core';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IMAGE_FALLBACK_URL } from '@/shared/const/common';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { ArticleBlockType } from '../../model/consts/articleConsts';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
};

const ArticleImage = ({ src }: { src?: string }) => (
  <Image
    src={src}
    alt="Article image"
    radius="md"
    mah={420}
    fit="cover"
    fallbackSrc={IMAGE_FALLBACK_URL}
  />
);

/**
 * Converts legacy blocks format to HTML string for backwards compatibility
 */
function blocksToHtml(
  blocks?: {
    id: string;
    type: string;
    title?: string;
    paragraphs?: string[];
    code?: string;
    src?: string;
  }[]
): string {
  if (!blocks || blocks.length === 0) return '';

  return blocks
    .map((block) => {
      switch (block.type) {
        case ArticleBlockType.TEXT: {
          const title = block.title ? `<h3>${block.title}</h3>` : '';
          const paragraphs = (block.paragraphs || []).map((p) => `<p>${p}</p>`).join('');
          return title + paragraphs;
        }
        case ArticleBlockType.CODE:
          return `<pre><code>${block.code || ''}</code></pre>`;
        case ArticleBlockType.IMAGE: {
          const src = block.src || '';
          const alt = block.title || '';
          return `<figure><img src="${src}" alt="${alt}" /><figcaption>${alt}</figcaption></figure>`;
        }
        default:
          return '';
      }
    })
    .join('');
}

const ArticleContent = () => {
  const article = useSelector(getArticleDetailsData);

  const htmlContent = article?.content || blocksToHtml(article?.blocks);

  return (
    <>
      <Title order={1} size="h1" fw={700}>
        {article?.title}
      </Title>
      <Text size="lg" c="dimmed">
        {article?.subtitle}
      </Text>
      <ArticleImage src={article?.img} />
      {htmlContent && (
        <TypographyStylesProvider>
          <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </TypographyStylesProvider>
      )}
    </>
  );
};

export const ArticleDetailsSkeleton = () => {
  return (
    <Stack gap="md" w="100%">
      <Skeleton height={16} width="90%" />
      <Skeleton height={16} width="100%" />
      <Skeleton height={16} width="95%" />
      <Skeleton height={16} width="85%" />
      <Skeleton height={16} width="100%" />
      <Skeleton height={200} width="100%" radius="md" mt="md" />
      <Skeleton height={16} width="100%" />
      <Skeleton height={16} width="90%" />
      <Skeleton height={16} width="95%" />
      <Skeleton height={16} width="80%" />
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

  let content: React.ReactNode;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Alert color="red" title={t('Ошибка')}>
        {t('Произошла ошибка при загрузке статьи.')}
      </Alert>
    );
  } else {
    content = <ArticleContent />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Box className={className}>
        <Stack gap="lg" w="100%">
          {content}
        </Stack>
      </Box>
    </DynamicModuleLoader>
  );
});
