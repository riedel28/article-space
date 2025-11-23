import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { NotificationList } from '@/entities/Notification';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

interface NotificationsProps {
    className?: string;
}

export const Notifications = (props: NotificationsProps) => {
    const { className } = props;
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { t } = useTranslation();

    const trigger = (
        <Button variant="ghost" size="icon" className={className}>
            <Bell className="h-5 w-5" />
            <span className="sr-only">{t('Уведомления')}</span>
        </Button>
    );

    if (isDesktop) {
        return (
            <Popover>
                <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                <PopoverContent
                    className="w-[500px] p-1 rounded-xl"
                    align="end"
                >
                    <NotificationList className="h-auto" />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className="p-2">
                <NotificationList className="h-auto mt-4" />
            </DrawerContent>
        </Drawer>
    );
};
