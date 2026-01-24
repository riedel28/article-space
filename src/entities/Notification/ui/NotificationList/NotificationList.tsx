import { memo } from 'react';
import { Stack, Skeleton, ScrollArea } from '@mantine/core';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000
  });

  if (isLoading) {
    return (
      <Stack gap={16} w="100%" className={className}>
        <Skeleton width="100%" radius="md" height={80} />
        <Skeleton width="100%" radius="md" height={80} />
        <Skeleton width="100%" radius="md" height={80} />
      </Stack>
    );
  }

  return (
    <ScrollArea.Autosize
      mah={400}
      maw={500}
      type="auto"
      styles={{
        viewport: {
          '& > div': {
            display: 'block !important'
          }
        }
      }}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </ScrollArea.Autosize>
  );
});
