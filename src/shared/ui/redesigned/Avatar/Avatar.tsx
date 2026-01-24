import { Avatar as MantineAvatar } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  'data-testid'?: string;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, size = 100, alt, 'data-testid': dataTestId } = props;

  return (
    <MantineAvatar
      className={classNames('', {}, [className])}
      src={src}
      alt={alt}
      size={size}
      data-testid={dataTestId}
    />
  );
};
