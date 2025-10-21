import { cn } from "@/utilities/helper";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const dropdownItemStyle = cva([
    "rounded text-sm outline-none select-none",
    "relative flex items-center gap-2 px-2 py-1.5",
    "focus:bg-inherit focus:text-inherit",
    "rounded", "cursor-pointer"], {
    variants: {
        variant: {
            default: ["bg-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white hover:text-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:text-zinc-200"],
            primary: ["bg-white hover:bg-slate-200 focus:bg-slate-200 focus:text-black dark:bg-zinc-100 text-black"],
            secondary: ["bg-gray-200 dark:bg-zinc-900 focus:text-white dark:hover:bg-zinc-800"],
            success: ["bg-green-600 focus:bg-green-600 focus:text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 text-white"],
            danger: ["bg-red-500 focus:bg-red-500 focus:text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 text-white"],
            info: ["bg-blue-500 focus:bg-blue-500 focus:text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"],
            warning: ["bg-yellow-500 focus:bg-yellow-500 focus:text-white hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-white"],
        },
        disabled: {
            false: null,
            true: ["opacity-50", "cursor-not-allowed"],
        },
    },
    defaultVariants: {
        variant: "default",
        disabled: false,
    },
});


type DropdownItemProps = VariantProps<typeof dropdownItemStyle> & React.ComponentProps<"div"> & {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode,
    active?: boolean,
}


const DropdownItem = ({
    className,
    children,
    startIcon,
    endIcon,
    active,
    variant,
    ...props
}: DropdownItemProps) => {
    return (
        <div
            role="menuitem"
            tabIndex={0}
            className={cn(
                dropdownItemStyle({ variant }),
                active ? "bg-zinc-800 text-white" : "",
                className
            )}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    (e.currentTarget as HTMLElement).click();
                }
            }}
            {...props}
        >
            {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
            {children}
            {endIcon && <span className="ml-auto flex-shrink-0">{endIcon}</span>}
        </div>
    );
};


DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;