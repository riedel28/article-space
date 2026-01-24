import { memo } from 'react';
import { Card, Skeleton, Group, Stack, Box } from '@mantine/core';
import { ArticleView } from '../../model/consts/articleConsts';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.BIG) {
      return (
        <Card
          padding="xl"
          className={className}
          w="100%"
          shadow="sm"
          radius="md"
          withBorder
        >
          <Stack gap="lg">
            <Group gap="sm">
              <Skeleton circle height={40} width={40} />
              <Stack gap={4}>
                <Skeleton height={14} width={120} />
                <Skeleton height={12} width={80} />
              </Stack>
            </Group>
            <Stack gap="xs">
              <Skeleton height={28} width="70%" />
              <Skeleton height={20} width="90%" />
            </Stack>
            <Skeleton height={300} radius="md" />
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="80%" />
            <Group justify="space-between" mt="md">
              <Skeleton height={36} width={150} radius="md" />
              <Skeleton height={20} width={60} />
            </Group>
          </Stack>
        </Card>
      );
    }

    return (
      <Card
        padding={0}
        h="100%"
        className={className}
        shadow="sm"
        radius="md"
        withBorder
        style={{ overflow: 'hidden' }}
      >
        <Skeleton height={180} />
        <Box p="md">
          <Stack gap="sm">
            <Skeleton height={18} width="90%" />
            <Skeleton height={18} width="70%" />
            <Stack gap="sm" mt="auto">
              <Group justify="space-between">
                <Skeleton height={12} width={60} />
                <Skeleton height={12} width={40} />
              </Group>
              <Group gap="xs">
                <Skeleton circle height={24} width={24} />
                <Skeleton height={14} width={80} />
              </Group>
            </Stack>
          </Stack>
        </Box>
      </Card>
    );
  }
);
