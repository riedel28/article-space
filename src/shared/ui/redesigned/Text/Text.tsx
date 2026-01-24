import { memo } from 'react';
import { Text as MantineText, Title } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  'data-testid'?: string;
}

const mapSizeToMantine: Record<TextSize, string> = {
  s: 'sm',
  m: 'md',
  l: 'lg'
};

const mapSizeToTitleOrder: Record<TextSize, 1 | 2 | 3> = {
  s: 3,
  m: 2,
  l: 1
};

const mapSizeToTitleSize: Record<TextSize, string> = {
  s: 'h3',
  m: 'h2',
  l: 'h1'
};

const mapVariantToColor: Record<TextVariant, string | undefined> = {
  primary: undefined,
  error: 'red',
  accent: 'cyan'
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold,
    'data-testid': dataTestId = 'Text'
  } = props;

  return (
    <div className={classNames('', {}, [className])}>
      {title && (
        <Title
          order={mapSizeToTitleOrder[size]}
          c={mapVariantToColor[variant]}
          ta={align}
          fw={bold ? 700 : undefined}
          size={mapSizeToTitleSize[size]}
          data-testid={`${dataTestId}.Header`}
        >
          {title}
        </Title>
      )}
      {text && (
        <MantineText
          size={mapSizeToMantine[size]}
          c={mapVariantToColor[variant]}
          ta={align}
          fw={bold ? 700 : undefined}
          data-testid={`${dataTestId}.Paragraph`}
        >
          {text}
        </MantineText>
      )}
    </div>
  );
});
