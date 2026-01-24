import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.css';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}

/**
 * @deprecated Use AppShellLayout from @/shared/layouts/AppShellLayout instead.
 * MainLayout is kept for backward compatibility only.
 *
 * Note: This layout renders the header prop in the right column, which differs
 * from the new AppShellLayout that renders the header at the top of the page
 * following standard application shell patterns.
 */
export const MainLayout = memo((props: MainLayoutProps) => {
  const { className, content, toolbar, header, sidebar } = props;

  return (
    <div className={classNames(cls?.MainLayout, {}, [className])}>
      <div className={cls?.content}>{content}</div>
      <div className={cls?.sidebar}>{sidebar}</div>
      <div className={cls?.rightbar}>
        <div className={cls?.header}>{header}</div>
        <div className={cls?.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
