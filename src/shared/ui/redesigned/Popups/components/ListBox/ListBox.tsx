import { ReactNode, useMemo } from 'react';
import { Select } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  label?: string;
  'data-testid'?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    label,
    'data-testid': dataTestId
  } = props;

  const selectData = useMemo(
    () =>
      items?.map((item) => ({
        value: item.value,
        label: typeof item.content === 'string' ? item.content : item.value,
        disabled: item.disabled
      })) ?? [],
    [items]
  );

  const handleChange = (newValue: string | null) => {
    if (newValue) {
      onChange(newValue as T);
    }
  };

  return (
    <Select
      className={classNames('', {}, [className])}
      data={selectData}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      disabled={readonly}
      label={label}
      data-testid={dataTestId}
    />
  );
}
