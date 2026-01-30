import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Stack, TextInput, Button, Group, Text, Select } from '@mantine/core';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { IconCheck, IconChevronDown, IconDeviceFloppy } from '@tabler/icons-react';
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';
import { getRouteArticleDetails } from '@/shared/const/router';
import { useArticleForm, ArticleFormValues } from '../../model/lib/useArticleForm';
import { useUpdateArticle } from '../../api/articleEditorApi';

interface ArticleEditFormProps {
  article: Article;
}

const ARTICLE_TYPE_OPTIONS = [
  { value: ArticleType.IT, label: 'IT' },
  { value: ArticleType.SCIENCE, label: 'Science' },
  { value: ArticleType.ECONOMICS, label: 'Economics' }
];

/**
 * Converts legacy blocks format to HTML string for backwards compatibility
 */
function blocksToHtml(blocks?: Article['blocks']): string {
  if (!blocks || blocks.length === 0) return '';

  return blocks
    .map((block) => {
      switch (block.type) {
        case ArticleBlockType.TEXT: {
          const title = block.title ? `<h3>${block.title}</h3>` : '';
          const paragraphs = block.paragraphs.map((p) => `<p>${p}</p>`).join('');
          return title + paragraphs;
        }
        case ArticleBlockType.CODE:
          return `<pre><code>${block.code}</code></pre>`;
        case ArticleBlockType.IMAGE:
          return `<figure><img src="${block.src}" alt="${block.title}" /><figcaption>${block.title}</figcaption></figure>`;
        default:
          return '';
      }
    })
    .join('');
}

/**
 * Gets content from article - prefers `content` field, falls back to converting blocks
 */
function getArticleContent(article: Article): string {
  if (article.content) {
    return article.content;
  }
  return blocksToHtml(article.blocks);
}

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
  const { article } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticle();

  const initialContent = getArticleContent(article);

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
          label={t('Title')}
          placeholder={t('Enter article title')}
          withAsterisk
          data-testid="ArticleEditForm.Title"
          {...form.getInputProps('title')}
        />

        <TextInput
          label={t('Subtitle')}
          placeholder={t('Enter article subtitle')}
          withAsterisk
          data-testid="ArticleEditForm.Subtitle"
          {...form.getInputProps('subtitle')}
        />

        <TextInput
          label={t('Image URL')}
          placeholder={t('Enter image URL')}
          data-testid="ArticleEditForm.Image"
          {...form.getInputProps('img')}
        />

        <Select
          label={t('Topic')}
          placeholder={t('Select a topic')}
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
            {t('Content')}
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
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            loading={isUpdating}
            data-testid="ArticleEditForm.SaveButton"
            leftSection={<IconDeviceFloppy size={18} />}
          >
            {t('Save changes')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
});

ArticleEditForm.displayName = 'ArticleEditForm';
