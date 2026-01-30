import { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserInited, initAuthData } from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { AppShellLayout } from '@/shared/layouts/AppShellLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

const App = memo(() => {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

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
        <AppShellLayout toolbar={toolbar}>
          <AppRouter />
        </AppShellLayout>
      </Suspense>
    </div>
  );
});

export default withTheme(App);
