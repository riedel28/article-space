import { memo } from 'react';
import { Stack, Skeleton, ScrollArea, Text, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import classes from './NotificationList.module.css';

interface NotificationListProps {
  className?: string;
  fullWidth?: boolean;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className, fullWidth } = props;
  const { t } = useTranslation();
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000
  });

  return (
    <Box maw={fullWidth ? undefined : 500} w={fullWidth ? '100%' : undefined}>
      <Box component="header" className={classes.header}>
        <Text fw={500} fz="sm">
          {t('Notifications')}
        </Text>
      </Box>
      {isLoading ? (
        <Stack gap={4} p={4} w="100%" className={className}>
          <Skeleton width="100%" radius="md" height={80} />
          <Skeleton width="100%" radius="md" height={80} />
          <Skeleton width="100%" radius="md" height={80} />
        </Stack>
      ) : (
        <ScrollArea.Autosize mah={350} p={4} type="auto" offsetScrollbars>
          {data?.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </ScrollArea.Autosize>
      )}
    </Box>
  );
});
