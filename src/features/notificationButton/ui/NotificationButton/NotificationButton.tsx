import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { ActionIcon, Popover, Box, Badge } from '@mantine/core';
import NotificationIcon from '@/shared/assets/icons/notification.svg?react';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import cls from './NotificationButton.module.css';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Replace with actual unread count from notifications API
  const unreadCount = 2;

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className={className}>
      <BrowserView>
        <Box pos="relative" display="inline-block">
          <Popover
            position="bottom-end"
            offset={12}
            shadow="xl"
            radius="lg"
            transitionProps={{
              transition: 'scale-y',
              duration: 200
            }}
          >
            <Popover.Target>
              <ActionIcon
                variant="subtle"
                size="lg"
                radius="lg"
                aria-label="Notifications"
                className={cls.actionIcon}
              >
                <NotificationIcon width={40} height={40} />
              </ActionIcon>
            </Popover.Target>

            <Popover.Dropdown p="xs">
              <NotificationList />
            </Popover.Dropdown>
          </Popover>

          {unreadCount > 0 && (
            <Badge
              size="sm"
              variant="filled"
              color="error.6"
              circle
              pos="absolute"
              top={-2}
              right={-2}
              style={{
                pointerEvents: 'none',
                minWidth: 18,
                height: 18,
                padding: '0 4px',
                border: '2px solid var(--mantine-color-body)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Box>
      </BrowserView>
      <MobileView>
        <Box pos="relative" display="inline-block">
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="lg"
            onClick={onOpenDrawer}
            aria-label="Notifications"
          >
            <NotificationIcon width={22} height={22} />
          </ActionIcon>

          {unreadCount > 0 && (
            <Badge
              size="sm"
              variant="filled"
              color="error.6"
              circle
              pos="absolute"
              top={-2}
              right={-2}
              style={{
                pointerEvents: 'none',
                minWidth: 18,
                height: 18,
                padding: '0 4px',
                border: '2px solid var(--mantine-color-body)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Box>
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
