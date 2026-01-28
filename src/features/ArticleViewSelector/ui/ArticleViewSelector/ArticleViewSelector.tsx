import { memo } from 'react';
import { Center, SegmentedControl } from '@mantine/core';

import { IconGridDots, IconMenu4 } from '@tabler/icons-react';

import { ArticleView } from '@/entities/Article';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewChange?: (view: ArticleView) => void;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewChange } = props;

  return (
    <SegmentedControl
      orientation="vertical"
      withItemsBorders={false}
      value={view}
      onChange={(value) => onViewChange?.(value as ArticleView)}
      size="lg"
      radius="md"
      className={className}
      data={[
        {
          value: ArticleView.SMALL,
          label: (
            <Center>
              <IconGridDots size={16} />
            </Center>
          )
        },
        {
          value: ArticleView.BIG,
          label: (
            <Center>
              <IconMenu4 size={16} />
            </Center>
          )
        }
      ]}
      styles={{
        label: {
          padding: 'var(--mantine-spacing-sm)'
        },
        innerLabel: {
          fontSize: 24
        }
      }}
    />
  );
});
