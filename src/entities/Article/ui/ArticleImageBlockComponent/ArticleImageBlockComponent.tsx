import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Box, Image } from '@mantine/core';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;
  const { t } = useTranslation();

  return (
    <Box className={className}>
      <Image src={block.src} alt={block.title} maw="100%" />
      {block.title && <Text text={block.title} align="center" />}
    </Box>
  );
});
