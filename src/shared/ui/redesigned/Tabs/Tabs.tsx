import { memo, ReactNode, useCallback } from 'react';
import { Tabs as MantineTabs } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

export type FlexDirection = 'row' | 'column';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
  'data-testid'?: string;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className,
    tabs,
    onTabClick,
    value,
    direction = 'row',
    'data-testid': dataTestId
  } = props;

  const handleChange = useCallback(
    (newValue: string | null) => {
      const tab = tabs.find((t) => t.value === newValue);
      if (tab) {
        onTabClick(tab);
      }
    },
    [onTabClick, tabs]
  );

  return (
    <MantineTabs
      className={classNames('', {}, [className])}
      value={value}
      onChange={handleChange}
      orientation={direction === 'column' ? 'vertical' : 'horizontal'}
      data-testid={dataTestId}
    >
      <MantineTabs.List>
        {tabs.map((tab) => (
          <MantineTabs.Tab key={tab.value} value={tab.value}>
            {tab.content}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>
    </MantineTabs>
  );
});
