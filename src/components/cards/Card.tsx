import React, { forwardRef } from 'react'
import { cn } from '@/utilities/helper'

export const Card = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">>
    (({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "block border rounded-lg shadow-sm",
                className
            )}
            {...props}
        />
    ))

export const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">>
    (({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "font-semibold",
                className
            )}
            {...props}
        />
    ))


export const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">>
    (({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "block mb-4",
                className
            )}
            {...props}
        />
    ))    

export const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">>
    (({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "block",
                className
            )}
            {...props}
        />
    ))

export const CardBody = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">>
    (({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "block p-4",
                className
            )}
            {...props}
        />
    ))