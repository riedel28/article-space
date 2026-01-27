import { memo } from 'react';
import { Box, Text } from '@mantine/core';
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
    <>
      <Text fw={500} size="sm" mb={4}>
        {item.title}
      </Text>
      <Text size="xs" c="dimmed">
        {item.description}
      </Text>
    </>
  );

  if (item.href) {
    return (
      <Link to={extractPath(item.href)} className={classes.NotificationItem}>
        {content}
      </Link>
    );
  }

  return (
    <Box className={classes.NotificationItem}>
      {content}
    </Box>
  );
});
