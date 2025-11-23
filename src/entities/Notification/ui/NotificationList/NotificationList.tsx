import { memo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { cn } from '@/lib/utils';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 10000
    });

    // Default height for desktop, can be overridden via className for mobile
    const scrollAreaClassName = className?.includes('max-h-')
        ? className
        : cn('h-[300px]', className);

    if (isLoading) {
        return (
            <ScrollArea className={scrollAreaClassName}>
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                </div>
            </ScrollArea>
        );
    }

    return (
        <ScrollArea className={scrollAreaClassName}>
            <div className="flex flex-col gap-1 w-full">
                {data?.map((item) => (
                    <NotificationItem key={item.id} item={item} />
                ))}
            </div>
        </ScrollArea>
    );
});
