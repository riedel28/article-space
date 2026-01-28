import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { SimpleGrid, Stack, Title, Center } from '@mantine/core';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_item, index) => <ArticleListItemSkeleton key={index} view={view} />);

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target
  } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <Center className={className} py="xl">
        <Title order={3} c="dimmed">
          {t('Статьи не найдены')}
        </Title>
      </Center>
    );
  }

  if (view === ArticleView.SMALL) {
    return (
      <SimpleGrid
        cols={{ base: 1, md: 2, xl: 3 }}
        spacing="lg"
        className={className}
        data-testid="ArticleList"
      >
        {articles.map((item) => (
          <ArticleListItem
            article={item}
            view={view}
            target={target}
            key={item.id}
          />
        ))}
        {isLoading && getSkeletons(view)}
      </SimpleGrid>
    );
  }

  return (
    <Stack gap="lg" className={className} data-testid="ArticleList">
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </Stack>
  );
});
