import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { mapComment } from '@/shared/api/mappers';

import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (text, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
      return rejectWithValue('no data');
    }

    try {
      const { data, error } = await extra.supabase
        .from('comments')
        .insert({
          article_id: article.id,
          user_id: userData.id,
          text
        })
        .select('*, user:profiles!user_id(id, username, avatar)')
        .single();

      if (error || !data) {
        throw new Error();
      }

      dispatch(fetchCommentsByArticleId(article.id));

      return mapComment(data);
    } catch {
      return rejectWithValue('error');
    }
  }
);
