import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button } from '@mantine/core';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button variant="subtle" onClick={toggle} className={className}>
      {t(short ? 'Короткий язык' : 'Язык')}
    </Button>
  );
});
