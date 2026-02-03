import { Article } from '@/entities/Article';
import { mapArticle } from '@/shared/api/mappers';
import { rtkApi } from '@/shared/api/rtkApi';
import { supabase } from '@/shared/api/supabase';

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], number>({
      queryFn: async (limit) => {
        const { data, error } = await supabase
          .from('articles')
          .select('*, user:profiles!user_id(id, username, avatar)')
          .limit(limit);

        if (error || !data) {
          return {
            error: { status: 'CUSTOM_ERROR', error: error?.message ?? 'Unknown error' }
          };
        }

        return { data: data.map(mapArticle) };
      }
    })
  })
});

export const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsListQuery;
