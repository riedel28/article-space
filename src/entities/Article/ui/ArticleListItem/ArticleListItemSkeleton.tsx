import { memo } from 'react';
import { Card, Skeleton, Group, AspectRatio } from '@mantine/core';
import { ArticleView } from '../../model/consts/articleConsts';
import classes from './ArticleListItemRedesigned/ArticleListItemRedesigned.module.css';

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
          data-testid="ArticleListItemSkeleton"
          className={`${className} ${classes.cardBig}`}
          w="100%"
          radius="md"
          withBorder
        >
          <div className={classes.cardBigContainer}>
            <div className={classes.imageContainer}>
              <Skeleton w="100%" h="100%" radius={0} />
            </div>

            <div className={classes.contentStack}>
              <div>
                <Skeleton h={18} w="80%" mb="xs" />
                <Skeleton h={14} w="100%" mb={4} />
                <Skeleton h={14} w="90%" mb="xs" />
                <Skeleton h={14} w={80} mt="xs" />
              </div>

              <Group gap="md" mt="md" wrap="wrap">
                <Group gap={6}>
                  <Skeleton circle h={14} w={14} />
                  <Skeleton h={12} w={60} />
                </Group>
                <Group gap={6}>
                  <Skeleton circle h={14} w={14} />
                  <Skeleton h={12} w={80} />
                </Group>
                <Group gap={6}>
                  <Skeleton circle h={14} w={14} />
                  <Skeleton h={12} w={70} />
                </Group>
              </Group>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        radius="md"
        withBorder
        h="100%"
        className={`${className} ${classes.card}`}
      >
        <Card.Section>
          <AspectRatio ratio={16 / 10}>
            <Skeleton h={180} />
          </AspectRatio>
        </Card.Section>

        <Skeleton h={20} mb={8} w="90%" mt="md" />
        <Skeleton h={20} w="70%" />

        <Card.Section p="md" mt="auto">
          <Group>
            <Group gap={4}>
              <Skeleton h={12} w={12} />
              <Skeleton h={12} w={30} />
            </Group>
            <Group gap={4}>
              <Skeleton h={12} w={12} />
              <Skeleton h={12} w={60} />
            </Group>
            <Group gap={4}>
              <Skeleton h={12} w={12} />
              <Skeleton h={12} w={80} />
            </Group>
          </Group>
        </Card.Section>
      </Card>
    );
  }
);

