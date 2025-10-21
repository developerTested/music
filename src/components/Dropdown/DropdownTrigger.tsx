import React from "react";
import { Button } from "../forms";
import type { DropdownTriggerProps } from "./type";
import { cn } from "@/utilities/helper";
import { useDropdown } from "./useDropdown";

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
    ({ children, className, asChild, ...props }, ref) => {
        const { toggleOpen } = useDropdown();

        if (asChild && React.isValidElement(children)) {
            return <div
                role="button"
                tabIndex={0}
                onClick={toggleOpen}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleOpen();
                    }
                }}
            >
                {React.cloneElement(children, props)}
            </div>
        }

        return (
            <Button
                ref={ref}
                className={cn("inline-flex items-center justify-center", className)}
                onClick={toggleOpen}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

DropdownTrigger.displayName = "DropdownTrigger"

export default DropdownTrigger;