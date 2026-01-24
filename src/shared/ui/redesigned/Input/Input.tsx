import React, {
  InputHTMLAttributes,
  memo,
  ReactNode,
  useCallback
} from 'react';
import { TextInput } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  size?: InputSize;
  'data-testid'?: string;
}

const mapSize: Record<InputSize, string> = {
  s: 'xs',
  m: 'sm',
  l: 'md'
};

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    label,
    size = 'm',
    'data-testid': dataTestId,
    ...otherProps
  } = props;

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  return (
    <TextInput
      className={classNames('', {}, [className])}
      value={value}
      onChange={onChangeHandler}
      type={type}
      placeholder={placeholder}
      autoFocus={autofocus}
      readOnly={readonly}
      leftSection={addonLeft}
      rightSection={addonRight}
      label={label}
      size={mapSize[size]}
      data-testid={dataTestId}
      {...otherProps}
    />
  );
});
