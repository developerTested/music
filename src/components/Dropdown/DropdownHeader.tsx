import type { DropdownElementProps } from './type'
import { cn } from '@/utilities/helper'

const DropdownHeader = ({ className, ...props }: DropdownElementProps) => {
    return (
        <div className={cn(
            "px-2 py-1.5 text-sm font-medium",
            className
        )}

            {...props}
        />
    )
}

DropdownHeader.displayName = "DropdownHeader";

export default DropdownHeader