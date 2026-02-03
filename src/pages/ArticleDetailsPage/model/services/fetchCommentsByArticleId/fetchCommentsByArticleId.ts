import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { mapComment } from '@/shared/api/mappers';

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!articleId) {
    return rejectWithValue('error');
  }

  try {
    const { data, error } = await extra.supabase
      .from('comments')
      .select('*, user:profiles!user_id(id, username, avatar)')
      .eq('article_id', articleId)
      .order('created_at', { ascending: true });

    if (error || !data) {
      throw new Error();
    }

    return data.map(mapComment);
  } catch {
    return rejectWithValue('error');
  }
});
