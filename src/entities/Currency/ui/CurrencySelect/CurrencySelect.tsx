import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Select } from '@mantine/core';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [Currency.RUB, Currency.EUR, Currency.USD];

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation();

    return (
      <Select
        className={className}
        value={value}
        label={t('Укажите валюту')}
        placeholder={t('Укажите валюту')}
        data={options}
        onChange={(selectedValue) =>
          onChange?.(selectedValue as Currency)
        }
        readOnly={readonly}
        w="100%"
        size="md"
      />
    );
  }
);
