
import { type ComponentProps } from 'react'
import { cn } from '@/utilities/helper'


export type DropdownElementProps = ComponentProps<"hr">;

const DropdownSeparator = ({ className, ...props }: DropdownElementProps) => {
    return (
        <hr className={cn(
            "border border-zinc-100 dark:border-zinc-800 -mx-2 my-2",
            className
        )}

            {...props}
        />
    )
}

export default DropdownSeparator

