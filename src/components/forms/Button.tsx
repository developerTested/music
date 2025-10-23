import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utilities/helper";

const buttonStyles = cva(["text-center", "uppercase", "rounded", "cursor-pointer"], {
    variants: {
        variant: {
            default: ["bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white dark:text-zinc-200"],
            primary: ["bg-white hover:bg-slate-200 dark:bg-white/20 text-black"],
            secondary: ["bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"],
            success: ["bg-green-600 hover:bg-green-600 dark:bg-success-600 text-white"],
            danger: ["bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"],
            info: ["bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 text-white"],
            warning: ["bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 text-white"],
            icon: ["bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-900"]
        },
        size: {
            default: ["px-4", "py-2", "rounded"],
            sm: ["px-2", "py-1", "text-xs", "rounded-md"],
            md: ["px-3 py-1.5 text-sm", "rounded-md"],
            base: ["px-4 py-2 text-sm", "rounded-md"],
            lg: ["px-5 py-3 text-base", "rounded-md"],
            xl: ["px-6 py-4 text-lg", "rounded-md"],
            icon: ["p-2 block shrink-0 aspect-square rounded-full"]
        },
        disabled: {
            false: null,
            true: ["opacity-50", "cursor-not-allowed"],
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        disabled: false,
    },
});

type buttonType = VariantProps<typeof buttonStyles> & React.ComponentProps<"button"> & {
    children: React.ReactNode,
    startIcon?: React.ReactElement,
    endIcon?: React.ReactElement,
    fullWidth?: boolean,
}

export function Button({ variant, size, disabled, className, startIcon, endIcon, fullWidth = false, children, ...props }: buttonType) {

    const subClasses = cn(className, {
        "w-full": fullWidth,
        "flex items-center gap-2": startIcon || endIcon
    });


    return (
        <button
            {...props}
            className={twMerge(
                buttonStyles({ variant, size, disabled }),
                subClasses
            )}
        >
            {startIcon && <span className="start-icon">{startIcon}</span>}
            <span className="button-content">{children}</span>
            {endIcon && <span className="end-icon">{endIcon}</span>}
        </button>
    );
};