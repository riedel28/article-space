import { memo, ReactNode } from 'react';
import { Drawer as MantineDrawer } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
    'data-testid'?: string;
}

export const DrawerContent = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        lazy,
        'data-testid': dataTestId,
    } = props;

    return (
        <MantineDrawer
            className={classNames('', {}, [className])}
            opened={!!isOpen}
            onClose={onClose || (() => {})}
            position="bottom"
            data-testid={dataTestId}
        >
            {children}
        </MantineDrawer>
    );
});

export const Drawer = (props: DrawerProps) => {
    return <DrawerContent {...props} />;
};
