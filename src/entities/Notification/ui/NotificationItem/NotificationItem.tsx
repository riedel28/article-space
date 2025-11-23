import { Notification } from '../../model/types/notification';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <div
            className={cn(
                'w-full py-2 px-3 rounded-lg hover:bg-accent',
                className
            )}
        >
            {item.title && (
                <h3 className="text-base font-medium mb-1">{item.title}</h3>
            )}
            {item.description && (
                <p className="text-sm text-muted-foreground">
                    {item.description}
                </p>
            )}
        </div>
    );

    if (item.href) {
        return (
            <a
                className="w-full block transition-all hover:opacity-90"
                target="_blank"
                href={item.href}
                rel="noreferrer"
            >
                <div className="transition-colors rounded-xl">{content}</div>
            </a>
        );
    }

    return content;
};
