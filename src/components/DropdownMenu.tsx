import React, { useEffect, useRef, useState } from 'react'
import { Button } from './forms';
import { cn } from '@/utilities/helper';
import { DropdownContext, useDropdown } from './Dropdown/useDropdown';
import type { DropdownTriggerProps } from './Dropdown/type';

type DropdownElementProps = React.ComponentProps<"div">

// Props for the Dropdown component
type DropdownProps = {
    children: React.ReactNode;
};

// Dropdown component
const Dropdown = ({ children }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleOpen = () => setOpen(prev => !prev);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <DropdownContext.Provider value={{ open, toggleOpen }}>
            <div ref={dropdownRef} className="dropdown relative block w-fit">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};


const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
    ({ children, className, onClick, asChild, ...props }, ref) => {
        const { toggleOpen } = useDropdown();

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, props);
        }

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            toggleOpen();
        };

        return (
            <Button
                ref={ref}
                className={cn("inline-flex items-center justify-center", className)}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Button>
        );
    }
);


const DropdownContent = ({ className, ...props }: DropdownElementProps) => {

    const { open } = useDropdown()

    return (
        <div
            className={cn(
                "absolute left-0 mt-2 w-56 p-1 rounded-md bg-white shadow-lg",
                "origin-top animate-in fade-in zoom-in-95",
                className,
                !open && "hidden"
            )}
            {...props}
        />
    )
}


const DropdownHeader = ({ className, ...props }: DropdownElementProps) => {
    return (
        <div className={cn(
            "px-2 py-1.5 text-sm font-medium border-b",
            className
        )}

            {...props}
        />
    )
}

const DropdownItem = ({ className, ...props }: DropdownElementProps) => {
    return (
        <div className={cn(
            "relative flex items-center gap-2 p-2 hover:bg-slate-100 rounded text-sm outline-hidden select-none",
            className
        )}

            {...props}
        />
    )
}


Dropdown.Trigger = DropdownTrigger
Dropdown.Header = DropdownHeader;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;

export { Dropdown }