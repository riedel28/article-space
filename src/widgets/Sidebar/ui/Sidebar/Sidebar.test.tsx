import { AppShell } from '@mantine/core';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { Sidebar } from '../Sidebar/Sidebar';

// Wrapper to provide AppShell context required by Sidebar
const SidebarWithAppShell = () => (
  <AppShell navbar={{ width: 250, breakpoint: 'sm' }}>
    <AppShell.Navbar>
      <Sidebar />
    </AppShell.Navbar>
  </AppShell>
);

describe('Sidebar', () => {
  test('renders within AppShell context', () => {
    componentRender(<SidebarWithAppShell />);
    // The Sidebar is composed of AppShell.Section elements which render as divs
    // Check that the navbar element exists and has content
    const navbar = document.querySelector('.mantine-AppShell-navbar');
    expect(navbar).toBeInTheDocument();
    expect(navbar).not.toBeEmptyDOMElement();
  });

  test('renders navigation links', () => {
    componentRender(<SidebarWithAppShell />);
    // Check that links are rendered (sidebar items are NavLinks)
    const links = document.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
  });
});
