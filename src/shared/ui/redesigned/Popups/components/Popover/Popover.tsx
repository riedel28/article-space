import { ReactNode } from 'react';
import { Popover as MantinePopover } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
    'data-testid'?: string;
}

const mapDirectionToPosition: Record<DropdownDirection, string> = {
    'top left': 'top-start',
    'top right': 'top-end',
    'bottom left': 'bottom-start',
    'bottom right': 'bottom-end',
};

export function Popover(props: PopoverProps) {
    const {
        className,
        trigger,
        direction = 'bottom right',
        children,
        'data-testid': dataTestId,
    } = props;

    return (
        <MantinePopover
            position={mapDirectionToPosition[direction] as any}
            data-testid={dataTestId}
        >
            <MantinePopover.Target>
                <div className={classNames('', {}, [className])}>{trigger}</div>
            </MantinePopover.Target>

            <MantinePopover.Dropdown>
                {children}
            </MantinePopover.Dropdown>
        </MantinePopover>
    );
}
