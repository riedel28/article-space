import { memo } from 'react';
import { Stack, Skeleton, ScrollArea } from '@mantine/core';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
  fullWidth?: boolean;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className, fullWidth } = props;
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000
  });

  if (isLoading) {
    return (
      <Stack gap={4} w="100%" className={className}>
        <Skeleton width="100%" radius="md" height={80} />
        <Skeleton width="100%" radius="md" height={80} />
        <Skeleton width="100%" radius="md" height={80} />
      </Stack>
    );
  }

  return (
    <ScrollArea.Autosize
      mah={400}
      maw={fullWidth ? undefined : 500}
      w={fullWidth ? '100%' : undefined}
      type="auto"
      offsetScrollbars
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </ScrollArea.Autosize>
  );
});
