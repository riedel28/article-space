import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

interface UpdateArticleArg {
  id: string;
  title: string;
  subtitle: string;
  type: string[];
  blocks: Article['blocks'];
  img?: string;
  userId: string;
  views: number;
  createdAt: string;
}

const articleEditorApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleForEdit: build.query<Article, string>({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        params: {
          _expand: 'user'
        }
      })
    }),
    updateArticle: build.mutation<Article, UpdateArticleArg>({
      query: ({ id, ...body }) => ({
        url: `/articles/${id}`,
        method: 'PUT',
        body: {
          id,
          ...body
        }
      })
    })
  })
});

export const useGetArticleForEdit = articleEditorApi.useGetArticleForEditQuery;
export const useUpdateArticle = articleEditorApi.useUpdateArticleMutation;
