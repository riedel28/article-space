import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { mapArticle } from '@/shared/api/mappers';

export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articleDetailsPage/fetchArticleRecommendations',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const { data, error } = await extra.supabase
        .from('articles')
        .select('*, user:profiles!user_id(id, username, avatar)')
        .limit(4);

      if (error || !data) {
        throw new Error();
      }

      return data.map(mapArticle);
    } catch {
      return rejectWithValue('error');
    }
  }
);
