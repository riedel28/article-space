import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { mapArticle } from '@/shared/api/mappers';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const limit = getArticlesPageLimit(getState());
  const sort = getArticlesPageSort(getState());
  const order = getArticlesPageOrder(getState());
  const search = getArticlesPageSearch(getState());
  const page = getArticlesPageNum(getState());
  const type = getArticlesPageType(getState());

  try {
    addQueryParams({
      sort,
      order,
      search,
      type
    });

    let query = extra.supabase
      .from('articles')
      .select('*, user:profiles!user_id(id, username, avatar)');

    if (type !== ArticleType.ALL) {
      query = query.contains('type', [type]);
    }

    if (search) {
      query = query.textSearch('fts', search, { type: 'websearch' });
    }

    const sortColumn = sort === 'createdAt' ? 'created_at' : sort;
    query = query.order(sortColumn, { ascending: order === 'asc' });

    const from = (page - 1) * limit;
    const to = page * limit - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error || !data) {
      throw new Error();
    }

    return data.map(mapArticle);
  } catch {
    return rejectWithValue('error');
  }
});
