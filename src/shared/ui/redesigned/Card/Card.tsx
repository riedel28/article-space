import { HTMLAttributes, memo, ReactNode } from 'react';
import { Card as MantineCard } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'normal' | 'partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
    fullWidth?: boolean;
    fullHeight?: boolean;
    'data-testid'?: string;
}

const mapPaddingToMantine: Record<CardPadding, string | number> = {
    '0': 0,
    '8': 'xs',
    '16': 'sm',
    '24': 'md',
};

const mapBorderToRadius: Record<CardBorder, string> = {
    round: 'xl',
    normal: 'md',
    partial: 'sm',
};

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max,
        padding = '8',
        border = 'normal',
        fullWidth,
        fullHeight,
        'data-testid': dataTestId,
        ...otherProps
    } = props;

    const withBorder = variant === 'outlined';

    return (
        <MantineCard
            className={classNames('', {}, [className])}
            padding={mapPaddingToMantine[padding]}
            radius={mapBorderToRadius[border]}
            withBorder={withBorder}
            w={max || fullWidth ? '100%' : undefined}
            h={fullHeight ? '100%' : undefined}
            data-testid={dataTestId}
            {...otherProps}
        >
            {children}
        </MantineCard>
    );
});
