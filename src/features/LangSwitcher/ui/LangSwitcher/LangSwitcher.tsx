import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LangSwitcherProps {
    short?: boolean;
}

export const LangSwitcher = ({ short }: LangSwitcherProps) => {
    const { i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    const currentLang = i18n.language === 'ru' ? 'Russian' : 'English';

    return (
        <Button
            variant="ghost"
            size={short ? 'icon' : 'default'}
            onClick={toggle}
            aria-label={`Switch language to ${i18n.language === 'ru' ? 'English' : 'Russian'}`}
        >
            <Globe />
            {!short && <span>{currentLang}</span>}
        </Button>
    );
};
