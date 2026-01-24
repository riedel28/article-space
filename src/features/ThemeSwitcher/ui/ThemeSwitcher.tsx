import React, { memo, useCallback } from 'react';
import ThemeIcon from '@/shared/assets/icons/theme.svg?react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();

    const onToggleHandler = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    return (
        <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />
    );
});
