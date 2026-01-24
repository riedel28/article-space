import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Box } from '@mantine/core';
import { Code } from '@/shared/ui/redesigned/Code';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <Box w="100%" className={className}>
        <Code text={block.code} />
      </Box>
    );
  }
);
