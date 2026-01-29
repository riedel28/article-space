import { Avatar as MantineAvatar, MantineColor } from '@mantine/core';

import classes from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  size?: number;
  alt?: string;
  color?: MantineColor;
  'data-testid'?: string;
}

export const Avatar = (props: AvatarProps) => {
  const { src, size = 100, alt, color, 'data-testid': dataTestId } = props;

  return (
    <MantineAvatar
      variant={color ? 'filled' : 'transparent'}
      color={color}
      src={src}
      alt={alt}
      size={size}
      data-testid={dataTestId}
      classNames={{
        placeholder: classes.placeholder
      }}
    />
  );
};
