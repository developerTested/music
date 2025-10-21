import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

// Context type
export type DropdownContextType = {
    open: boolean;
    toggleOpen: () => void;
};


// For components based on <div>
export type DropdownElementProps = ComponentPropsWithoutRef<'div'>;

// For components based on <button> with optional polymorphism
export type DropdownTriggerProps = ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
    className?: string;
    children?: ReactNode; // for default case
};

export type ChildWithClassAndClick = ReactElement<{
    className?: string;
    onClick?: (e: React.MouseEvent<unknown | HTMLButtonElement, MouseEvent>) => void;
}>;
