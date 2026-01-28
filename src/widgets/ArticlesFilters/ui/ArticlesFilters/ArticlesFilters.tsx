import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, TextInput, Card, Group, Select } from '@mantine/core';
import { IconCheck, IconChevronDown, IconSearch } from '@tabler/icons-react';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

interface ArticlesFiltersProps {
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
    <Card w="100%" withBorder>
      <Stack gap="md">
        <TextInput
          label={t('Search')}
          placeholder={t('Search articles')}
          leftSectionPointerEvents="none"
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => onChangeSearch(e.currentTarget.value)}
        />

        <ArticleTypeTabs value={type} onChangeType={onChangeType} />

        <Select
          label={t('Sort by')}
          placeholder={t('Select sort')}
          data={[
            { value: 'createdAt', label: t('Date') },
            { value: 'title', label: t('Title') },
            { value: 'views', label: t('Views') }
          ]}
          rightSectionPointerEvents="none"
          rightSection={<IconChevronDown size={16} />}
          renderOption={({ option, checked }) => (
            <Group flex="1" gap="xs">
              {option.label}
              {checked && (
                <IconCheck
                  style={{
                    marginInlineStart: 'auto',
                    color: 'var(--mantine-color-brand-6)'
                  }}
                  stroke={1.8}
                  size={18}
                />
              )}
            </Group>
          )}
          value={sort}
          onChange={(value) => value && onChangeSort(value as ArticleSortField)}
        />

        <Select
          label={t('Order')}
          placeholder={t('Select order')}
          data={[
            { value: 'asc', label: t('Ascending') },
            { value: 'desc', label: t('Descending') }
          ]}
          rightSectionPointerEvents="none"
          rightSection={<IconChevronDown size={16} />}
          renderOption={({ option, checked }) => (
            <Group flex="1" gap="xs">
              {option.label}
              {checked && (
                <IconCheck
                  style={{
                    marginInlineStart: 'auto',
                    color: 'var(--mantine-color-brand-6)'
                  }}
                  stroke={1.8}
                  size={18}
                />
              )}
            </Group>
          )}
          value={order}
          onChange={(value) => value && onChangeOrder(value as SortOrder)}
        />
      </Stack>
    </Card>
  );

  // return (
  //   <Stack gap="lg" className={className} style={{ width: 260 }}>
  //     <Card shadow="sm" padding="md" radius="md" withBorder>
  //       <TextInput
  //         onChange={(e) => onChangeSearch(e.currentTarget.value)}
  //         value={search}
  //         placeholder={t('Поиск')}
  //         leftSection={<IconSearch size={18} />}
  //         size="md"
  //       />
  //     </Card>

  //     <ArticleTypeTabs value={type} onChangeType={onChangeType} />

  //     <Card shadow="sm" padding="md" radius="md" withBorder>
  //       <ArticleSortSelector
  //         order={order}
  //         sort={sort}
  //         onChangeOrder={onChangeOrder}
  //         onChangeSort={onChangeSort}
  //       />
  //     </Card>
  //   </Stack>
  // );
});
