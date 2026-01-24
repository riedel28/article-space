import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AppShellLayout } from '../AppShellLayout';

export const AppLoaderLayout = memo(() => {
  return (
    <AppShellLayout sidebarCollapsed={false}>
      <VStack gap="16" style={{ height: '100%' }}>
        <Skeleton width="70%" height={32} border="16px" />
        <Skeleton width="40%" height={20} border="16px" />
        <Skeleton width="50%" height={20} border="16px" />
        <Skeleton width="30%" height={32} border="16px" />
        <Skeleton width="80%" height="40%" border="16px" />
        <Skeleton width="80%" height="40%" border="16px" />
      </VStack>
    </AppShellLayout>
  );
});
