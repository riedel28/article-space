import { ReactNode } from 'react';
import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { AppLink } from '../../redesigned/AppLink/AppLink';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownMenuProps {
    items: DropdownItem[];
    trigger: ReactNode;
}

export function DropdownMenu(props: DropdownMenuProps) {
    const { trigger, items } = props;

    return (
        <ShadcnDropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="outline-none focus:outline-none cursor-pointer"
                    aria-label="Open menu"
                >
                    {trigger}
                </button>
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
