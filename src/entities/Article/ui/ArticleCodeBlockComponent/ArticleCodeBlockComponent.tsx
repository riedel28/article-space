import { memo } from 'react';
import { Box } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
  const { className, block } = props;

  return (
    <Box w="100%" className={className}>
      <CodeHighlight code={block.code} language="tsx" radius="md" />
    </Box>
  );
});
