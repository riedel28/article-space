import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Stack } from '@mantine/core';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <Stack gap="xs" className={className}>
        {block.title && <Text title={block.title} />}
        {block.paragraphs.map((paragraph, index) => (
          <Text key={paragraph} text={paragraph} />
        ))}
      </Stack>
    );
  }
);
