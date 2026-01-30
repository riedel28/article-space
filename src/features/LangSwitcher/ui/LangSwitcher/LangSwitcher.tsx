import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import classes from './LangSwitcher.module.css';

interface LangSwitcherProps {
  short?: boolean;
}

export const LangSwitcher = ({ short }: LangSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  // Show the language we'll switch TO (next language)
  const nextLang = i18n.language === 'ru' ? (short ? 'En' : 'English') : (short ? 'Ru' : 'Русский');

  return (
    <Button variant="subtle" onClick={toggle} className={classes.button}>
      {nextLang}
    </Button>
  );
};
