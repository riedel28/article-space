import * as React from 'react';
import { cn } from '@/shared/lib/utils';

const Field = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        orientation?: 'horizontal' | 'vertical';
    }
>(({ className, orientation = 'vertical', ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'space-y-2',
                orientation === 'horizontal' && 'flex items-center space-x-2 space-y-0',
                className
            )}
            {...props}
        />
    );
});
Field.displayName = 'Field';

const FieldLabel = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    );
});
FieldLabel.displayName = 'FieldLabel';

const FieldControl = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
});
FieldControl.displayName = 'FieldControl';

const FieldDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
});
FieldDescription.displayName = 'FieldDescription';

const FieldError = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & {
        errors?: string[];
    }
>(({ className, children, errors, ...props }, ref) => {
    const errorMessage = errors?.join(', ') || children;
    if (!errorMessage) return null;

    return (
        <p
            ref={ref}
            className={cn('text-sm font-medium text-destructive', className)}
            {...props}
        >
            {errorMessage}
        </p>
    );
});
FieldError.displayName = 'FieldError';

const FieldLegend = React.forwardRef<
    HTMLLegendElement,
    React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => {
    return (
        <legend
            ref={ref}
            className={cn('text-sm font-medium leading-none', className)}
            {...props}
        />
    );
});
FieldLegend.displayName = 'FieldLegend';

export {
    Field,
    FieldLabel,
    FieldControl,
    FieldDescription,
    FieldError,
    FieldLegend
};

