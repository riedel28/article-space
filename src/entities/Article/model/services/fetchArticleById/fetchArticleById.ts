import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { mapArticle } from '@/shared/api/mappers';

import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!articleId) {
      throw new Error('');
    }

    try {
      const { data, error } = await extra.supabase
        .from('articles')
        .select('*, user:profiles!user_id(id, username, avatar)')
        .eq('id', articleId)
        .single();

      if (error || !data) {
        throw new Error();
      }

      return mapArticle(data);
    } catch {
      return rejectWithValue('error');
    }
  }
);
