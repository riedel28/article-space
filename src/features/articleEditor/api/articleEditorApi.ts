import { Article } from '@/entities/Article';
import { mapArticle } from '@/shared/api/mappers';
import { rtkApi } from '@/shared/api/rtkApi';
import { supabase } from '@/shared/api/supabase';

interface UpdateArticleArg {
  id: string;
  title: string;
  subtitle: string;
  type: string[];
  content: string;
  img?: string;
  userId: string;
  views: number;
  createdAt: string;
}

const articleEditorApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleForEdit: build.query<Article, string>({
      queryFn: async (articleId) => {
        const { data, error } = await supabase
          .from('articles')
          .select('*, user:profiles!user_id(id, username, avatar)')
          .eq('id', articleId)
          .single();

        if (error || !data) {
          return {
            error: { status: 'CUSTOM_ERROR', error: error?.message ?? 'Unknown error' }
          };
        }

        return { data: mapArticle(data) };
      },
      providesTags: (_result, _error, articleId) => [{ type: 'ArticleForEdit', id: articleId }]
    }),
    updateArticle: build.mutation<Article, UpdateArticleArg>({
      invalidatesTags: (_result, _error, { id }) => [{ type: 'ArticleForEdit', id }],
      queryFn: async ({ id, title, subtitle, type, content, img, userId, views }) => {
        const { data, error } = await supabase
          .from('articles')
          .update({
            title,
            subtitle,
            type,
            content,
            img,
            user_id: userId,
            views
          })
          .eq('id', id)
          .select('*, user:profiles!user_id(id, username, avatar)')
          .single();

        if (error || !data) {
          return {
            error: { status: 'CUSTOM_ERROR', error: error?.message ?? 'Unknown error' }
          };
        }

        return { data: mapArticle(data) };
      }
    })
  })
});

export const useGetArticleForEdit = articleEditorApi.useGetArticleForEditQuery;
export const useUpdateArticle = articleEditorApi.useUpdateArticleMutation;
