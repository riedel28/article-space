import { memo } from 'react';
import { Overlay as MantineOverlay } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
  'data-testid'?: string;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick, 'data-testid': dataTestId } = props;

  return (
    <MantineOverlay
      className={classNames('', {}, [className])}
      onClick={onClick}
      fixed
      data-testid={dataTestId}
    />
  );
});
