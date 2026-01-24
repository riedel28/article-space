import { useMantineColorScheme } from '@mantine/core';

type ColorScheme = 'light' | 'dark';

interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: ColorScheme) => void) => void;
    theme: ColorScheme;
}

export function useTheme(): UseThemeResult {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const toggleTheme = (saveAction?: (theme: ColorScheme) => void) => {
        toggleColorScheme();
        const newTheme: ColorScheme = colorScheme === 'light' ? 'dark' : 'light';
        saveAction?.(newTheme);
    };

    return {
        theme: colorScheme as ColorScheme,
        toggleTheme,
    };
}
