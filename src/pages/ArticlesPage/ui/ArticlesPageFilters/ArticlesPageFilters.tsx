import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Stack, TextInput, Card } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const {
    onChangeSort,
    onChangeType,
    sort,
    type,
    onChangeSearch,
    search,
    onChangeView,
    view,
    onChangeOrder,
    order
  } = useArticleFilters();

  return (
    <Stack gap="lg" className={className}>
      <ArticleViewSelector view={view} onViewChange={onChangeView} />

      <Card shadow="sm" padding="md" radius="md" withBorder>
        <TextInput
          onChange={(e) => onChangeSearch(e.currentTarget.value)}
          value={search}
          placeholder={t('Поиск')}
          leftSection={<IconSearch size={18} />}
          size="md"
        />
      </Card>

      <Card shadow="sm" padding="md" radius="md" withBorder>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </Card>

      <ArticleTypeTabs value={type} onChangeType={onChangeType} />
    </Stack>
  );
});
