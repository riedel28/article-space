import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, TextInput, Card } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeType,
    onChangeSearch,
    search,
    onChangeSort,
    sort,
    onChangeOrder,
    order,
    type
  } = props;
  const { t } = useTranslation();

  return (
    <Stack gap="lg" className={className} style={{ width: 260 }}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <TextInput
          onChange={(e) => onChangeSearch(e.currentTarget.value)}
          value={search}
          placeholder={t('Поиск')}
          leftSection={<IconSearch size={18} />}
          size="md"
        />
      </Card>

      <ArticleTypeTabs value={type} onChangeType={onChangeType} />

      <Card shadow="sm" padding="md" radius="md" withBorder>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </Card>
    </Stack>
  );
});
