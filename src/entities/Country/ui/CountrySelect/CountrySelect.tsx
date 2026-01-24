import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Select } from '@mantine/core';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  Country.Armenia,
  Country.Russia,
  Country.Belarus,
  Country.Kazakhstan,
  Country.Ukraine
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();

    return (
      <Select
        className={className}
        value={value}
        label={t('Укажите страну')}
        placeholder={t('Укажите страну')}
        data={options}
        onChange={(selectedValue) =>
          onChange?.(selectedValue as Country)
        }
        readOnly={readonly}
        w="100%"
        size="md"
      />
    );
  }
);
