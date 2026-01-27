import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import classes from './LangSwitcher.module.css';

interface LangSwitcherProps {
  short?: boolean;
}

export const LangSwitcher = ({ short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button variant="subtle" onClick={toggle} className={classes.button}>
      {t(short ? 'Короткий язык' : 'Язык')}
    </Button>
  );
};
