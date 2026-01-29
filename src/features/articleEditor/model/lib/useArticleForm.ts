import { useForm } from '@mantine/form';
import { ArticleType } from '@/entities/Article';

export interface ArticleFormValues {
  title: string;
  subtitle: string;
  img: string;
  type: ArticleType | null;
  content: string;
}

interface UseArticleFormOptions {
  initialValues?: Partial<ArticleFormValues>;
}

export function useArticleForm(options: UseArticleFormOptions = {}) {
  const { initialValues } = options;

  const form = useForm<ArticleFormValues>({
    mode: 'controlled',
    initialValues: {
      title: initialValues?.title ?? '',
      subtitle: initialValues?.subtitle ?? '',
      img: initialValues?.img ?? '',
      type: initialValues?.type ?? null,
      content: initialValues?.content ?? ''
    },
    validate: {
      title: (value) =>
        value.length < 3 ? 'Title must be at least 3 characters' : null,
      subtitle: (value) =>
        value.length < 3 ? 'Subtitle must be at least 3 characters' : null,
      type: (value) => (!value ? 'Select a topic' : null)
    }
  });

  return form;
}
