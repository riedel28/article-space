import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Group, Stack, Avatar, Text, Skeleton, Box } from '@mantine/core';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <Group
        data-testid="CommentCard.Loading"
        gap="md"
        wrap="nowrap"
        align="flex-start"
        className={className}
      >
        <Skeleton circle w={48} h={48} />
        <Stack gap="xs" flex={1}>
          <Group gap="sm">
            <Skeleton h={16} w={120} />
            <Skeleton h={14} w={100} />
          </Group>
          <Skeleton h={40} w="100%" />
        </Stack>
      </Group>
    );
  }

  if (!comment) {
    return null;
  }

  const userInitial = comment.user.username?.charAt(0).toUpperCase() || '?';

  return (
    <Group
      data-testid="CommentCard.Content"
      gap="md"
      wrap="nowrap"
      align="flex-start"
      className={className}
    >
      <Box
        component={Link}
        to={getRouteProfile(comment.user.id)}
        td="none"
      >
        <Avatar src={comment.user.avatar} alt={comment.user.username} size={48} radius="xl">
          {userInitial}
        </Avatar>
      </Box>
      <Stack gap={4} flex={1}>
        <Group gap="sm" align="baseline">
          <Text
            component={Link}
            to={getRouteProfile(comment.user.id)}
            fw={600}
            td="none"
            c="dark"
          >
            {comment.user.username}
          </Text>
          {comment.createdAt && (
            <Text size="sm" c="dimmed">
              {formatDate(comment.createdAt)}
            </Text>
          )}
        </Group>
        <Text>{comment.text}</Text>
      </Stack>
    </Group>
  );
});
