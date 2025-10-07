import React, { forwardRef, type Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyles = cva(["block rounded"], {
    variants: {
        variant: {
            default: ["bg-white dark:bg-zinc-900 border border-zinc-400 dark:border-zinc-900"]
        },
        size: {
            default: ["px-4 py-2 outline-none rounded-md"]
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
})

type InputProps = VariantProps<typeof inputStyles> & React.ComponentProps<"input"> & {
    startIcon?: React.ReactElement,
    endIcon?: React.ReactElement,
    fullWidth?: boolean,
}

export const Input = forwardRef(
    (
        {
            type = "text",
            className,
            variant,
            size,
            startIcon,
            endIcon,
            fullWidth = true,
            ...props
        }: InputProps,
        ref: Ref<HTMLInputElement>
    ) => {

        return <div className="relative flex items-center flex-1">


            <input
                {...props}
                type={type}
                ref={ref}
                className={twMerge(
                    inputStyles({ variant, size }),
                    startIcon && "pl-10",
                    endIcon && "pr-10",
                    fullWidth && "w-full",
                    className
                )}
            />


            {/* Start Icon */}
            {startIcon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    {startIcon}
                </span>
            )}

            {/* End Icon */}
            {endIcon && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    {endIcon}
                </span>
            )}

        </div>
    })