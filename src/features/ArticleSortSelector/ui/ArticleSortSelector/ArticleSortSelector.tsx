import { Stack, Text } from '@mantine/core';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { ListBox, SelectOption } from '@/shared/ui/redesigned/Popups';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию')
      },
      {
        value: 'desc',
        content: t('убыванию')
      }
    ],
    [t]
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('дате создания')
      },
      {
        value: ArticleSortField.TITLE,
        content: t('названию')
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('просмотрам')
      }
    ],
    [t]
  );

  return (
    <Stack gap="xs" className={className}>
      <Text size="sm" fw={600} c="dimmed">
        {t('Сортировать по:')}
      </Text>
      <ListBox items={sortFieldOptions} value={sort} onChange={onChangeSort} />
      <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
    </Stack>
  );
});
