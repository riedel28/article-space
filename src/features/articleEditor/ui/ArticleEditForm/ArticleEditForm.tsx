import { Button, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { IconCheck, IconChevronDown, IconDeviceFloppy } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Article, ArticleType } from '@/entities/Article';
import { getRouteArticleDetails } from '@/shared/const/router';

import { useUpdateArticle } from '../../api/articleEditorApi';
import { ArticleFormValues, useArticleForm } from '../../model/lib/useArticleForm';

interface ArticleEditFormProps {
  article: Article;
}

const ARTICLE_TYPE_OPTIONS = [
  { value: ArticleType.IT, label: 'IT' },
  { value: ArticleType.SCIENCE, label: 'Science' },
  { value: ArticleType.ECONOMICS, label: 'Economics' }
];

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
  const { article } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticle();

  const initialContent = article.content || '';

  const initialType = Array.isArray(article.type) ? article.type[0] : article.type;

  const form = useArticleForm({
    initialValues: {
      title: article.title,
      subtitle: article.subtitle,
      img: article.img,
      type: initialType || null,
      content: initialContent
    }
  });

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: initialContent,
    onUpdate: ({ editor: editorInstance }) => {
      form.setFieldValue('content', editorInstance.getHTML());
    }
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  const handleCancel = useCallback(() => {
    navigate(getRouteArticleDetails(article.id));
  }, [navigate, article.id]);

  const handleSubmit = useCallback(
    async (values: ArticleFormValues) => {
      if (!values.type) return;

      try {
        await updateArticle({
          id: article.id,
          title: values.title,
          subtitle: values.subtitle,
          img: values.img,
          type: [values.type],
          content: values.content,
          userId: article.user.id,
          views: article.views,
          createdAt: article.createdAt
        }).unwrap();

        navigate(getRouteArticleDetails(article.id));
      } catch {
        // Error is handled by RTK Query
      }
    },
    [article.id, article.user.id, article.views, article.createdAt, navigate, updateArticle]
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label={t('Заголовок')}
          placeholder={t('Введите заголовок статьи')}
          withAsterisk
          data-testid="ArticleEditForm.Title"
          {...form.getInputProps('title')}
        />

        <TextInput
          label={t('Подзаголовок')}
          placeholder={t('Введите подзаголовок статьи')}
          withAsterisk
          data-testid="ArticleEditForm.Subtitle"
          {...form.getInputProps('subtitle')}
        />

        <TextInput
          label={t('Ссылка на изображение')}
          placeholder={t('Введите ссылку на изображение')}
          data-testid="ArticleEditForm.Image"
          {...form.getInputProps('img')}
        />

        <Select
          label={t('Тема')}
          placeholder={t('Выберите тему')}
          data={ARTICLE_TYPE_OPTIONS}
          withAsterisk
          data-testid="ArticleEditForm.Topic"
          {...form.getInputProps('type')}
          rightSectionPointerEvents="none"
          rightSection={<IconChevronDown size={16} />}
          renderOption={({ option, checked }) => (
            <Group flex="1" gap="xs">
              {option.label}
              {checked && (
                <IconCheck
                  style={{
                    marginInlineStart: 'auto',
                    color: 'var(--mantine-color-brand-6)'
                  }}
                  stroke={1.8}
                  size={18}
                />
              )}
            </Group>
          )}
        />

        <div>
          <Text size="sm" fw={500} mb={4}>
            {t('Содержание')}
          </Text>
          <RichTextEditor editor={editor} data-testid="ArticleEditForm.Content">
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Code />
                <RichTextEditor.CodeBlock />
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </div>

        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={handleCancel}
            data-testid="ArticleEditForm.CancelButton"
          >
            {t('Отменить')}
          </Button>
          <Button
            type="submit"
            loading={isUpdating}
            data-testid="ArticleEditForm.SaveButton"
            leftSection={<IconDeviceFloppy size={18} />}
          >
            {t('Сохранить изменения')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
});

ArticleEditForm.displayName = 'ArticleEditForm';
