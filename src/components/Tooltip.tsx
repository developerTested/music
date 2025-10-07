import React from "react";
import { type VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const tooltipStyles = cva(
    "absolute z-50 px-3 py-2 text-sm font-medium rounded-lg shadow-sm transition-opacity duration-200 pointer-events-none whitespace-nowrap",
    {
        variants: {
            variant: {
                default: "bg-zinc-900 text-white dark:bg-zinc-800",
                success: "bg-green-600 text-white",
                danger: "bg-red-600 text-white",
                info: "bg-blue-600 text-white",
                warning: "bg-yellow-600 text-white",
            },
            position: {
                "top-left": "bottom-full right-full mb-2",
                "top-center": "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
                "top-end": "bottom-full left-full mb-2",
                "center-left": "right-full top-1/2 transform -translate-y-1/2 mr-2",
                "center": "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
                "center-right": "left-full top-1/2 transform -translate-y-1/2 ml-2",
                "bottom-left": "top-full right-full mt-2",
                "bottom-center": "top-full left-1/2 transform -translate-x-1/2 mt-2",
                "bottom-end": "top-full left-full mt-2",
            },
            visible: {
                true: "opacity-100",
                false: "opacity-0",
            },
            width: {
                auto: "w-auto",
                fit: "w-fit",
                full: "max-w-xs w-full",
                xs: "max-w-xs",
                sm: "max-w-sm",
                md: "max-w-md",
                lg: "max-w-lg",
                xl: "max-w-xl",
            }
        },
        defaultVariants: {
            variant: "default",
            position: "top-center",
            visible: false,
            width: "auto",
        },
    }
);

const arrowStyles = cva(
    "absolute w-2 h-2 bg-inherit transform rotate-45",
    {
        variants: {
            position: {
                "top-left": "top-full -translate-y-1/2 left-1/4",
                "top-center": "top-full -translate-y-1/2 left-1/2 -translate-x-1/2",
                "top-end": "top-full -translate-y-1/2 left-3/4 -translate-x-1/2",
                "center-left": "left-full -translate-x-1/2 top-1/2 -translate-y-1/2",
                "center": "hidden",
                "center-right": "right-full translate-x-1/2 top-1/2 -translate-y-1/2",
                "bottom-left": "bottom-full translate-y-1/2 left-1/4",
                "bottom-center": "bottom-full translate-y-1/2 left-1/2 -translate-x-1/2",
                "bottom-end": "bottom-full translate-y-1/2 left-3/4 -translate-x-1/2",
            }
        },
        defaultVariants: {
            position: "top-center",
        }
    }
);

type TooltipProps = VariantProps<typeof tooltipStyles> & React.ComponentProps<'div'> & {
    children: React.ReactNode;
    title: string | React.ReactNode;
    showOnHover?: boolean;
}

export default function Tooltip({
    children,
    title,
    position,
    variant,
    width,
    className,
    showOnHover = true,
    ...props
}: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    const handleMouseEnter = () => {
        if (showOnHover) {
            setIsVisible(true);
        }
    };

    const handleMouseLeave = () => {
        if (showOnHover) {
            setIsVisible(false);
        }
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}

            <div
                className={twMerge(
                    tooltipStyles({ position, variant, visible: isVisible, width }),
                    className
                )}
                role="tooltip"
            >
                {title}

                <div className={arrowStyles({ position })} />
            </div>
        </div>
    );
}