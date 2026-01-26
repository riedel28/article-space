import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

const latestArticlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getLatestArticles: build.query<Article[], number>({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
          _sort: 'createdAt',
          _order: 'desc',
          _expand: 'user'
        }
      })
    })
  })
});

export const useLatestArticles = latestArticlesApi.useGetLatestArticlesQuery;
