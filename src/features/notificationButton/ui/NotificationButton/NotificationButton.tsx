import { useTranslation } from 'react-i18next';
import { IconBell } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { ActionIcon, Popover, Drawer, Text, Indicator } from '@mantine/core';
import { NotificationList } from '@/entities/Notification';
import classes from './NotificationButton.module.css';

export const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <BrowserView>
        <Popover width={300} position="bottom-end" shadow="sm" radius="md">
          <Popover.Target>
            <Indicator color="red" size={8} offset={4}>
              <ActionIcon
                variant="subtle"
                size="lg"
                className={classes.icon}
                aria-label={t('Notifications')}
              >
                <IconBell size={24} stroke={1.8} />
              </ActionIcon>
            </Indicator>
          </Popover.Target>
          <Popover.Dropdown p={4}>
            <NotificationList />
          </Popover.Dropdown>
        </Popover>
      </BrowserView>
      <MobileView>
        <Indicator color="red" size={8} offset={4}>
          <ActionIcon
            variant="subtle"
            size="lg"
            className={classes.icon}
            onClick={onOpenDrawer}
            aria-label={t('Notifications')}
          >
            <IconBell size={24} stroke={1.8} />
          </ActionIcon>
        </Indicator>
        <Drawer
          opened={isOpen}
          onClose={onCloseDrawer}
          position="bottom"
          title={<Text fw={600}>{t('Уведомления')}</Text>}
        >
          <NotificationList fullWidth />
        </Drawer>
      </MobileView>
    </>
  );
};
