import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utilities/helper";

const buttonStyles = cva(["text-center", "rounded", "cursor-pointer", " transition duration-300"], {
    variants: {
        variant: {
            default: ["bg-black hover:bg-gray-800 dark:bg-zinc-300 text-white dark:text-black"],
            primary: ["uppercase bg-white hover:bg-slate-200 dark:bg-white/20 text-black"],
            secondary: ["uppercase bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"],
            success: ["uppercase bg-success hover:bg-green-600 dark:bg-white/20 text-white"],
            danger: ["uppercase bg-red-500 hover:bg-red-600 dark:bg-white/20 text-white"],
            info: ["uppercase bg-blue-500 hover:bg-blue-600 dark:bg-white/20 text-white"],
            warning: ["uppercase bg-yellow-500 hover:bg-yellow-600 dark:bg-white/20 text-white"],
            icon: ["bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:bg-widget"]
        },
        size: {
            default: ["px-4", "py-2", "text-center", "rounded"],
            sm: ["px-2", "py-1", "text-xs", "text-center", "rounded-md"],
            md: ["px-3 py-1.5 text-sm", "text-center", "rounded-md"],
            base: ["px-4 py-2 text-sm", "text-center", "rounded-md"],
            lg: ["px-5 py-3 text-base", "text-center", "rounded-md"],
            xl: ["px-6 py-4 text-lg", "text-center", "rounded-md"],
            icon: ["p-2", "text-center", "rounded-full"]
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