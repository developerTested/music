import React, { forwardRef, type Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utilities/helper";
import { MdError } from "react-icons/md";

const inputStyles = cva(["block rounded"], {
    variants: {
        variant: {
            default: ["bg-white dark:bg-zinc-900 border border-zinc-300 focus:border-zinc-700 dark:border-zinc-900"]
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
    hasError?: boolean,
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
            hasError = false,
            ...props
        }: InputProps,
        ref: Ref<HTMLInputElement>
    ) => {

        return <div className="relative flex items-center flex-1">
            <input
                {...props}
                type={type}
                ref={ref}
                className={cn(
                    inputStyles({ variant, size }),
                    startIcon && "pl-10",
                    endIcon && "pr-10",
                    fullWidth && "w-full",
                    className
                )}
            />

            {/* Error Icon */}
            {hasError && (
                <span className={cn(
                    "absolute top-1/2 -translate-y-1/2 pointer-events-none",
                    endIcon ? "right-8" : "right-3",
                    "text-red-600"
                )}
                >
                    <MdError />
                </span>
            )}

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