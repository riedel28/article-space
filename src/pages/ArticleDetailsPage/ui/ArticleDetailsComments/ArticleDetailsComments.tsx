import { Box, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { memo, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import classes from './ArticleDetailsComments.module.css';

const AddCommentFormSkeleton = () => (
  <Group gap="md" wrap="nowrap" align="flex-start">
    <Skeleton height={38} circle />
    <Stack gap="sm" flex={1}>
      <Skeleton height={100} radius="lg" />
      <Group justify="flex-end">
        <Skeleton height={36} width={120} radius="md" />
      </Group>
    </Stack>
  </Group>
);

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  return (
    <Box className={className}>
      <Stack gap="md" className={classes.commentsSection}>
        <Group gap={4} align="center">
          <Title order={4} fz="xl">
            {t('Комментарии')}
          </Title>
          <Text fz="lg" c="dimmed">
            ({comments.length})
          </Text>
        </Group>

        <Suspense fallback={<AddCommentFormSkeleton />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>

        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Stack>
    </Box>
  );
});
