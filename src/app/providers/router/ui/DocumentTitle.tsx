import { memo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle/useDocumentTitle';
import { routeConfig } from '../config/routeConfig';

export const DocumentTitle = memo(() => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const currentRoute = Object.values(routeConfig).find((route) =>
    matchPath(route.path || '', pathname)
  );

  const title = currentRoute?.titleKey ? t(currentRoute.titleKey) : undefined;

  useDocumentTitle(title);

  return null;
});
