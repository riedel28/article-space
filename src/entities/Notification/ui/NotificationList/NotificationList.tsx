import { Box,ScrollArea, Skeleton, Stack, Text } from '@mantine/core';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import classes from './NotificationList.module.css';

interface NotificationListProps {
  className?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className, fullWidth, showHeader = true } = props;
  const { t } = useTranslation();
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000
  });

  return (
    <Box maw={fullWidth ? undefined : 500} w={fullWidth ? '100%' : undefined}>
      {showHeader && (
        <Box component="header" className={classes.header}>
          <Text fw={500} fz="sm">
            {t('Notifications')}
          </Text>
        </Box>
      )}
      {isLoading ? (
        <Stack gap={4} p={fullWidth ? 0 : 4} w="100%" className={className}>
          <Skeleton width="100%" radius="md" height={80} />
          <Skeleton width="100%" radius="md" height={80} />
          <Skeleton width="100%" radius="md" height={80} />
        </Stack>
      ) : (
        <ScrollArea.Autosize mah={350} p={fullWidth ? 0 : 4} type="auto" offsetScrollbars>
          {data?.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </ScrollArea.Autosize>
      )}
    </Box>
  );
});
