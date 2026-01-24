import { ReactNode } from 'react';
import { Menu } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    direction?: DropdownDirection;
    trigger: ReactNode;
    'data-testid'?: string;
}

const mapDirectionToPosition: Record<DropdownDirection, string> = {
    'top left': 'top-start',
    'top right': 'top-end',
    'bottom left': 'bottom-start',
    'bottom right': 'bottom-end',
};

export function Dropdown(props: DropdownProps) {
    const {
        className,
        trigger,
        items,
        direction = 'bottom right',
        'data-testid': dataTestId,
    } = props;

    return (
        <Menu
            position={mapDirectionToPosition[direction] as any}
            data-testid={dataTestId}
        >
            <Menu.Target>
                <div className={classNames('', {}, [className])}>{trigger}</div>
            </Menu.Target>
            <Menu.Dropdown>
                {items.map((item, index) => {
                    if (item.href) {
                        return (
                            <Menu.Item
                                key={`dropdown-key-${index}`}
                                disabled={item.disabled}
                            >
                                <AppLink to={item.href}>
                                    {item.content}
                                </AppLink>
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            key={`dropdown-key-${index}`}
                            onClick={item.onClick}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </Menu.Item>
                    );
                })}
            </Menu.Dropdown>
        </Menu>
    );
}
