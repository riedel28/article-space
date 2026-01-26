import { memo, ReactElement } from 'react';
import { cn } from '@/shared/lib/utils/index';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/shared/ui/shadcn/sidebar';
import { Separator } from '@/shared/ui/shadcn/separator';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, content, toolbar, header, sidebar } = props;

    return (
        <SidebarProvider>
            {sidebar}
            <SidebarInset className={cn(className)}>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    {header}
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4">
                    {content}
                </main>
                {toolbar && (
                    <div className="fixed bottom-4 right-4">
                        {toolbar}
                    </div>
                )}
            </SidebarInset>
        </SidebarProvider>
    );
});
