import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';
import { supabase } from '@/shared/api/supabase';

interface GetArticleRatingArg {
  userId: string;
  articleId: string;
}

interface RateArticleArg {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      queryFn: async ({ articleId, userId }) => {
        const { data, error } = await supabase
          .from('article_ratings')
          .select('rate, feedback')
          .eq('user_id', userId)
          .eq('article_id', articleId);

        if (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }

        const ratings: Rating[] = (data ?? []).map((row) => ({
          rate: row.rate,
          feedback: row.feedback ?? undefined
        }));

        return { data: ratings };
      },
      providesTags: (_result, _error, { articleId }) => [
        { type: 'ArticleRating', id: articleId }
      ]
    }),
    rateArticle: build.mutation<void, RateArticleArg>({
      queryFn: async ({ userId, articleId, rate, feedback }) => {
        const { error } = await supabase.from('article_ratings').upsert(
          {
            user_id: userId,
            article_id: articleId,
            rate,
            feedback
          },
          { onConflict: 'user_id,article_id' }
        );

        if (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }

        return { data: undefined };
      },
      invalidatesTags: (_result, _error, { articleId }) => [
        { type: 'ArticleRating', id: articleId }
      ]
    })
  })
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
