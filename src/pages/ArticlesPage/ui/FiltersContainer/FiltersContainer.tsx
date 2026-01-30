import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

export const FiltersContainer = () => {
  const { onChangeSort, onChangeType, sort, type, onChangeSearch, search, onChangeOrder, order } =
    useArticleFilters();

  return (
    <ArticlesFilters
      type={type}
      onChangeSearch={onChangeSearch}
      order={order}
      onChangeOrder={onChangeOrder}
      search={search}
      sort={sort}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
    />
  );
};
