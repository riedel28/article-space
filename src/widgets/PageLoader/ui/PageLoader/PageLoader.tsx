import { Card, Container, Group, Skeleton, Stack } from '@mantine/core';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './PageLoader.module.css';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={classNames(cls.PageLoader, {}, [className])}>
    <Container size="md" py="xl" w="100%" px="xs">
      <Stack gap="lg">
        <Group justify="space-between">
          <Skeleton height={32} width={200} radius="md" />
          <Skeleton height={36} width={100} radius="md" />
        </Group>

        <Card padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Skeleton height={24} width="60%" radius="sm" />
            <Skeleton height={16} width="40%" radius="sm" />
            <Skeleton height={120} radius="md" mt="sm" />
            <Group gap="sm">
              <Skeleton height={36} width={100} radius="md" />
              <Skeleton height={36} width={100} radius="md" />
            </Group>
          </Stack>
        </Card>

        <Card padding="lg" radius="lg" withBorder>
          <Stack gap="sm">
            <Skeleton height={20} width="80%" radius="sm" />
            <Skeleton height={16} width="100%" radius="sm" />
            <Skeleton height={16} width="90%" radius="sm" />
            <Skeleton height={16} width="70%" radius="sm" />
          </Stack>
        </Card>
      </Stack>
    </Container>
  </div>
);
