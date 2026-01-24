import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  ReactNode
} from 'react';
import { Button as MantineButton } from '@mantine/core';
import { classNames } from '@/shared/lib/classNames/classNames';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  className?: string;
  /**
   * Button visual variant
   */
  variant?: ButtonVariant;
  /**
   * Makes the button square
   */
  square?: boolean;
  /**
   * Button size
   */
  size?: ButtonSize;
  /**
   * Disables the button
   */
  disabled?: boolean;
  /**
   * Button content
   */
  children?: ReactNode;
  /**
   * Makes the button full width
   */
  fullWidth?: boolean;

  color?: ButtonColor;

  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

const mapVariant: Record<ButtonVariant, string> = {
  clear: 'subtle',
  filled: 'filled',
  outline: 'outline'
};

const mapColor: Record<ButtonColor, string | undefined> = {
  normal: undefined,
  success: 'green',
  error: 'red'
};

const mapSize: Record<ButtonSize, string> = {
  m: 'sm',
  l: 'md',
  xl: 'lg'
};

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      className,
      children,
      variant = 'outline',
      square,
      disabled,
      fullWidth,
      size = 'm',
      addonLeft,
      addonRight,
      color = 'normal',
      ...otherProps
    } = props;

    return (
      <MantineButton
        className={classNames('', {}, [className])}
        variant={mapVariant[variant]}
        color={mapColor[color]}
        size={mapSize[size]}
        disabled={disabled}
        fullWidth={fullWidth}
        leftSection={addonLeft}
        rightSection={addonRight}
        ref={ref}
        {...otherProps}
      >
        {children}
      </MantineButton>
    );
  }
);
