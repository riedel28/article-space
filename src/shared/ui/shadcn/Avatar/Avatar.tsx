import { CSSProperties, useMemo } from 'react';
import { Avatar as ShadcnAvatar, AvatarImage as ShadcnAvatarImage, AvatarFallback as ShadcnAvatarFallback } from '@/components/ui/avatar';
import UserIcon from '@/shared/assets/icons/user-filled.svg?react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { cn } from '@/lib/utils';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

    return (
        <ShadcnAvatar
            style={styles}
            className={cn('border-0', className)}
        >
            {src && (
                <ShadcnAvatarImage
                    src={src}
                    alt={alt}
                    style={styles}
                    className="rounded-full"
                />
            )}
            <ShadcnAvatarFallback style={styles}>
                {errorFallback}
            </ShadcnAvatarFallback>
        </ShadcnAvatar>
    );
};

