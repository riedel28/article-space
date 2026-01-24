import { memo, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppShellLayout } from '@/shared/layouts/AppShellLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

const App = memo(() => {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <div id="app">
        <AppLoaderLayout />
      </div>
    );
  }

  return (
    <div id="app">
      <Suspense fallback="">
        <AppShellLayout
          toolbar={toolbar}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={() => setSidebarCollapsed((prev) => !prev)}
        >
          <AppRouter />
        </AppShellLayout>
      </Suspense>
    </div>
  );
});

export default withTheme(App);
