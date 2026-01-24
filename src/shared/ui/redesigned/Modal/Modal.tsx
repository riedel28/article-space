import { ReactNode } from 'react';
import { Modal as MantineModal } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  'data-testid'?: string;
}

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy,
    'data-testid': dataTestId
  } = props;

  return (
    <MantineModal
      className={classNames('', {}, [className])}
      opened={!!isOpen}
      onClose={onClose || (() => {})}
      centered
      data-testid={dataTestId}
    >
      {children}
    </MantineModal>
  );
};
