import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/app-image.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';
import cls from './AppLogo.module.css';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
  return (
    <HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
      <AppSvg width={size} height={size} color="black" className={cls.appLogo} />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  );
});
