import { memo } from 'react';
import { Group, ActionIcon, Card } from '@mantine/core';
import ListIcon from '@/shared/assets/icons/burger.svg?react';
import TiledIcon from '@/shared/assets/icons/tile.svg?react';
import { ArticleView } from '@/entities/Article';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon
  }
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <Card
      padding="sm"
      radius="md"
      shadow="sm"
      withBorder
      className={className}
    >
      <Group gap="xs">
        {viewTypes.map((viewType) => {
          const IconComponent = viewType.icon;
          const isSelected = viewType.view === view;

          return (
            <ActionIcon
              key={viewType.view}
              onClick={onClick(viewType.view)}
              variant={isSelected ? 'filled' : 'subtle'}
              size="lg"
              color={isSelected ? 'brand' : 'gray'}
            >
              <IconComponent width={20} height={20} />
            </ActionIcon>
          );
        })}
      </Group>
    </Card>
  );
});
