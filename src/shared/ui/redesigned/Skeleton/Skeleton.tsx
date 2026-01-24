import { memo } from 'react';
import { Skeleton as MantineSkeleton } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
    'data-testid'?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        border,
        'data-testid': dataTestId,
    } = props;

    return (
        <MantineSkeleton
            className={classNames('', {}, [className])}
            height={height}
            width={width}
            radius={border}
            data-testid={dataTestId}
        />
    );
});
