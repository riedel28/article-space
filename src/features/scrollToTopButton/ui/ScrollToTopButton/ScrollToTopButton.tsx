import { ActionIcon } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { memo } from 'react';

import classes from './ScrollToTopButton.module.css';

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ActionIcon
      onClick={onClick}
      variant="light"
      size="xl"
      radius="xl"
      color="brand"
      className={`${classes.button} ${className ?? ''}`}
    >
      <IconArrowUp size={24} />
    </ActionIcon>
  );
});
