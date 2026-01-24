import { memo, ReactElement, ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

interface AppShellLayoutProps {
  className?: string;
  children: ReactNode;
  toolbar?: ReactElement;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export const AppShellLayout = memo((props: AppShellLayoutProps) => {
  const { children, toolbar, sidebarCollapsed = false, onSidebarToggle } = props;

  return (
    <AppShell
      padding="md"
      layout="alt"
      withBorder={false}
      transitionDuration={300}
      transitionTimingFunction="ease"
      header={{ height: 60 }}
      navbar={{
        width: sidebarCollapsed ? 50 : 220,
        breakpoint: 0,
        collapsed: { desktop: false, mobile: false }
      }}
      aside={
        toolbar
          ? {
              width: 100,
              breakpoint: 0,
              collapsed: { desktop: false, mobile: false }
            }
          : undefined
      }
    >
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Navbar p={0}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={onSidebarToggle} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      {toolbar && <AppShell.Aside>{toolbar}</AppShell.Aside>}
    </AppShell>
  );
});
