import { Suspense } from 'react';
import { Dialog, DialogContent } from '@/shared/ui/shadcn/Dialog';
import { Skeleton } from '@/shared/ui/shadcn/Skeleton';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

const LoginFormSkeleton = () => (
    <div className="flex flex-col space-y-4">
        <Skeleton className="h-7 w-48" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
    </div>
);

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className={className}>
            <Suspense fallback={<LoginFormSkeleton />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </DialogContent>
    </Dialog>
);
