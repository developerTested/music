import React, { forwardRef, type Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyles = cva(["block rounded"], {
    variants: {
        variant: {
            default: ["bg-white dark:bg-white/20 border border-gray-300 dark:border-none"]
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

export const Input = forwardRef(({ type = "text", className, variant, size, startIcon, endIcon, fullWidth, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {

    const subClass = fullWidth ? "w-full" : ""

    return <div className="relative flex items-center flex-1">

        {startIcon ? <div className="flex items-center justify-center text-inherit p-2"> {startIcon} </div> : undefined}

        <input
            {...props}
            type={type}
            ref={ref}
            className={twMerge(inputStyles({ variant, size }), className, subClass)}
        />

        {endIcon ? <div className="flex items-center justify-center text-inherit p-2"> {endIcon} </div> : undefined}
    </div>
})