import { Stack, Text } from '@mantine/core';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, isLoading, comments } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Stack gap="xl" w="100%" className={className}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </Stack>
    );
  }

  return (
    <Stack gap="xl" w="100%" className={className}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard isLoading={isLoading} comment={comment} key={comment.id} />
        ))
      ) : (
        <Text c="dimmed">{t('Комментарии отсутствуют')}</Text>
      )}
    </Stack>
  );
});
