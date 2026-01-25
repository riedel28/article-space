import { memo, ReactElement, ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

interface AppShellLayoutProps {
  children: ReactNode;
  toolbar?: ReactElement;
}

export const AppShellLayout = memo((props: AppShellLayoutProps) => {
  const { children, toolbar } = props;
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      layout="alt"
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      aside={
        toolbar
          ? {
              width: 100,
              breakpoint: 'md',
              collapsed: { desktop: false, mobile: true }
            }
          : undefined
      }
    >
      <AppShell.Header>
        <Navbar opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      {toolbar && <AppShell.Aside>{toolbar}</AppShell.Aside>}
    </AppShell>
  );
});
