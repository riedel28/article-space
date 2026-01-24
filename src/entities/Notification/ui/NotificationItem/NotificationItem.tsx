import { memo } from 'react';
import { Text, Anchor, Box } from '@mantine/core';
import { Notification } from '../../model/types/notification';
import classes from './NotificationItem.module.css';

interface NotificationItemProps {
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { item } = props;

  const content = (
    <Box className={classes.NotificationItem}>
      <Text fw={500} size="sm" mb={4}>
        {item.title}
      </Text>
      <Text size="xs" c="dimmed">
        {item.description}
      </Text>
    </Box>
  );

  if (item.href) {
    return (
      <Anchor href={item.href} target="_blank" underline="never" w="100%">
        {content}
      </Anchor>
    );
  }

  return content;
});
