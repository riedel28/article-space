import { Box, Group,Text } from '@mantine/core';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Notification } from '../../model/types/notification';
import classes from './NotificationItem.module.css';

interface NotificationItemProps {
  item: Notification;
}

const extractPath = (href: string): string => {
  const match = href.match(/^https?:\/\/[^/]+(\/.*)/);
  return match ? match[1] : href;
};

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { item } = props;

  const content = (
    <Group gap="sm" wrap="nowrap" align="flex-start">
      <Box className={classes.indicator} data-unread={item.unread || undefined} />

      <Box>
        <Text fw={600} size="sm" c="dark">
          {item.title}
        </Text>
        <Text size="xs" c="dimmed">
          {item.description}
        </Text>
      </Box>
    </Group>
  );

  if (item.href) {
    return (
      <Link to={extractPath(item.href)} className={classes.NotificationItem}>
        {content}
      </Link>
    );
  }

  return <Box className={classes.NotificationItem}>{content}</Box>;
});
