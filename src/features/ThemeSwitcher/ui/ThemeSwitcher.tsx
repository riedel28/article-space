import { useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/components/ui/button';
import { Theme } from '@/shared/const/theme';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    const isDark = theme === Theme.DARK;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onToggleHandler}
            aria-label="Toggle theme"
        >
            {isDark ? <Sun /> : <Moon />}
        </Button>
    );
};
