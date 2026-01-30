import { Flex as MantineFlex } from '@mantine/core';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  wrap?: FlexWrap;
  gap?: FlexGap;
  max?: boolean;
  'data-testid'?: string;
}

const mapJustify: Record<FlexJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between'
};

const mapAlign: Record<FlexAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
};

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    wrap = 'nowrap',
    gap,
    max,
    'data-testid': dataTestId
  } = props;

  return (
    <MantineFlex
      className={classNames('', {}, [className])}
      justify={mapJustify[justify]}
      align={mapAlign[align]}
      direction={direction}
      wrap={wrap}
      gap={gap ? Number(gap) : undefined}
      maw={max ? '100%' : undefined}
      w={max ? '100%' : undefined}
      data-testid={dataTestId}
    >
      {children}
    </MantineFlex>
  );
};
