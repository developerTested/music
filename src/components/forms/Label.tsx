import type React from "react"
import { cn } from "@/utilities/helper"
import { cva, type VariantProps } from "class-variance-authority"

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

type LabelProps = VariantProps<typeof labelVariants> & React.ComponentProps<"label">

export function Label({ className, ...props }: LabelProps) {
    return (
        <label
            className={cn(labelVariants(), className)}
            {...props}
        />
    )
}
