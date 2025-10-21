import { useDropdown } from './useDropdown'
import { cn } from '@/utilities/helper'
import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import { useRef } from 'react';



const dropdownContentStyles = cva(
    'absolute z-10 w-56 px-2 py-2 rounded-md shadow-lg animate-in fade-in zoom-in-95 bg-white dark:bg-zinc-900 border dark:border-zinc-800',
    {
        variants: {
            position: {
                top: 'absolute bottom-full mb-1 right-0 origin-bottom-right animate-slide-up',
                bottom: 'absolute top-full mt-1 right-0 origin-top-right animate-slide-down',
                left: 'absolute right-full mr-1 top-0 origin-left animate-slide-left',
                right: 'absolute left-full ml-1 top-0 origin-top-left animate-slide-right',
            },
        },

        defaultVariants: {
            position: 'bottom',
        },
    }
);

type DropdownContentProps = VariantProps<typeof dropdownContentStyles> & React.ComponentProps<"div">

const DropdownContent = ({ className, position, ...props }: DropdownContentProps) => {
    const { open } = useDropdown()

    const containerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const items = containerRef.current?.querySelectorAll('[role="menuitem"]');
        if (!items || items.length === 0) return;

        const active = document.activeElement;
        const index = Array.from(items).indexOf(active as Element);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = items[(index + 1) % items.length] as HTMLElement;
            next.focus();
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = items[(index - 1 + items.length) % items.length] as HTMLElement;
            prev.focus();
        }
    };

    return (
        <div
            ref={containerRef}
            onKeyDown={handleKeyDown}
            role="menu"
            className={cn(
                dropdownContentStyles({ position }),
                className,
                !open && "hidden"
            )}
            {...props}
        />
    )
}

DropdownContent.displayName = "DropdownContent";

export default DropdownContent 