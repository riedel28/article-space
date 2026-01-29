import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  TextInput,
  MultiSelect,
  Button,
  Group,
  Text
} from '@mantine/core';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';
import { getRouteArticleDetails } from '@/shared/const/router';
import {
  useArticleForm,
  ArticleFormValues
} from '../../model/lib/useArticleForm';
import { useUpdateArticle } from '../../api/articleEditorApi';
import { IconDeviceFloppy } from '@tabler/icons-react';

interface ArticleEditFormProps {
  article: Article;
}

const ARTICLE_TYPE_OPTIONS = [
  { value: ArticleType.IT, label: 'IT' },
  { value: ArticleType.SCIENCE, label: 'Science' },
  { value: ArticleType.ECONOMICS, label: 'Economics' }
];

function blocksToHtml(blocks: Article['blocks']): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case ArticleBlockType.TEXT: {
          const title = block.title ? `<h3>${block.title}</h3>` : '';
          const paragraphs = block.paragraphs
            .map((p) => `<p>${p}</p>`)
            .join('');
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

function htmlToBlocks(html: string): Article['blocks'] {
  const blocks: Article['blocks'] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const children = Array.from(doc.body.children);

  let currentTextBlock: {
    id: string;
    type: typeof ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
  } | null = null;
  let blockId = 1;

  const getNextBlockId = () => {
    const id = blockId;
    blockId += 1;
    return String(id);
  };

  const flushTextBlock = () => {
    if (currentTextBlock && currentTextBlock.paragraphs.length > 0) {
      blocks.push(currentTextBlock);
      currentTextBlock = null;
    }
  };

  children.forEach((element) => {
    const tagName = element.tagName.toLowerCase();

    if (tagName === 'pre') {
      flushTextBlock();
      const code =
        element.querySelector('code')?.textContent || element.textContent || '';
      blocks.push({
        id: getNextBlockId(),
        type: ArticleBlockType.CODE,
        code
      });
    } else if (tagName === 'figure') {
      flushTextBlock();
      const img = element.querySelector('img');
      const caption = element.querySelector('figcaption');
      if (img) {
        blocks.push({
          id: getNextBlockId(),
          type: ArticleBlockType.IMAGE,
          src: img.getAttribute('src') || '',
          title: caption?.textContent || img.getAttribute('alt') || ''
        });
      }
    } else if (tagName.match(/^h[1-6]$/)) {
      flushTextBlock();
      currentTextBlock = {
        id: getNextBlockId(),
        type: ArticleBlockType.TEXT,
        title: element.textContent || '',
        paragraphs: []
      };
    } else if (tagName === 'p') {
      if (!currentTextBlock) {
        currentTextBlock = {
          id: getNextBlockId(),
          type: ArticleBlockType.TEXT,
          paragraphs: []
        };
      }
      const text = element.textContent?.trim();
      if (text) {
        currentTextBlock.paragraphs.push(text);
      }
    }
  });

  flushTextBlock();

  if (blocks.length === 0 && html.trim()) {
    blocks.push({
      id: '1',
      type: ArticleBlockType.TEXT,
      paragraphs: [html.replace(/<[^>]*>/g, '')]
    });
  }

  return blocks;
}

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
  const { article } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticle();

  const initialContent = blocksToHtml(article.blocks);

  const form = useArticleForm({
    initialValues: {
      title: article.title,
      subtitle: article.subtitle,
      img: article.img,
      type: article.type,
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
      const blocks = htmlToBlocks(values.content);

      try {
        await updateArticle({
          id: article.id,
          title: values.title,
          subtitle: values.subtitle,
          img: values.img,
          type: values.type,
          blocks,
          userId: article.user.id,
          views: article.views,
          createdAt: article.createdAt
        }).unwrap();

        navigate(getRouteArticleDetails(article.id));
      } catch {
        // Error is handled by RTK Query
      }
    },
    [
      article.id,
      article.user.id,
      article.views,
      article.createdAt,
      navigate,
      updateArticle
    ]
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

        <MultiSelect
          label={t('Topics')}
          placeholder={t('Select topics')}
          data={ARTICLE_TYPE_OPTIONS}
          withAsterisk
          data-testid="ArticleEditForm.Topics"
          {...form.getInputProps('type')}
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
