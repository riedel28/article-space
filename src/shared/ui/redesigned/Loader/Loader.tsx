import { Loader as MantineLoader } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
  <MantineLoader className={classNames('', {}, [className])} type="dots" />
);
