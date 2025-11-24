import { ReactNode } from 'react';
import { UserCircleIcon } from 'lucide-react';
import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { AppLink } from '../../redesigned/AppLink/AppLink';
import { Button } from '@/components/ui/button';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownMenuProps {
    items: DropdownItem[];
}

export function DropdownMenu(props: DropdownMenuProps) {
    const { items } = props;

    return (
        <ShadcnDropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="data-[state=open]:bg-accent rounded-md"
                    aria-label="Open menu"
                >
                    <UserCircleIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                {items.map((item, index) => {
                    if (item.href) {
                        return (
                            <DropdownMenuItem
                                key={`dropdown-key-${index}`}
                                disabled={item.disabled}
                                asChild
                            >
                                <AppLink
                                    to={item.href}
                                    className="cursor-pointer w-full"
                                >
                                    {item.content}
                                </AppLink>
                            </DropdownMenuItem>
                        );
                    }

                    return (
                        <DropdownMenuItem
                            key={`dropdown-key-${index}`}
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className="cursor-pointer"
                        >
                            {item.content}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    );
}
