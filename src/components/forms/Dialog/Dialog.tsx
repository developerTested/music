import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "../Button";
import React, { useEffect, useRef } from "react";
import { cn } from "@/utilities/helper";
import { DialogContext, useDialog } from "./DialogContext";

const dialogStyles = cva('shadow-lg rounded-lg p-2 z-1030', {
    variants: {
        size: {
            xs: 'w-48',        // Extra Small
            sm: 'w-64',        // Small
            md: 'w-96',        // Medium
            lg: 'w-[500px]',   // Large
            xl: 'w-[600px]',   // Extra Large
            '2xl': 'w-[700px]', // Double Extra Large
            '3xl': 'w-[800px]', // Triple Extra Large
            '4xl': 'w-[900px]', // Quadruple Extra Large
            normal: 'w-auto',  // Default Normal size (auto width)
        },
    },
    defaultVariants: {
        size: 'md',
    },
})

type DialogProps = VariantProps<typeof dialogStyles> & React.ComponentProps<"div"> & {
    open: boolean,
    onClose: () => void,
}


const Dialog = ({ open, onClose, children, className, size }: DialogProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                contentRef.current &&
                event.target instanceof Node &&
                !contentRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            if (open) {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <DialogContext.Provider value={{ open, onClose, ref: contentRef }}>
            <div
                className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-100"
                onClick={onClose}
            />

            {/* Dialog container */}
            <div className="fixed inset-0 z-1030 flex items-center justify-center p-4">
                <dialog
                    open={open}
                    onClose={onClose}
                    className="relative bg-transparent border-none outline-none m-0 p-0 animate-in"
                >
                    <div
                        ref={contentRef}
                        className={twMerge(
                            dialogStyles({ size }),
                            "bg-white rounded-lg shadow-xl",
                            className
                        )}
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                    >
                        {children}
                    </div>
                </dialog>
            </div>
        </DialogContext.Provider>
    );
};


type DialogHeaderProps = {
    enableClose?: boolean,
    title: string,

}
const DialogHeader = ({ title, enableClose = true }: DialogHeaderProps) => {

    const { onClose } = useDialog();

    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>

            {enableClose &&
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                    <MdClose className="size-6" />
                </button>}

        </div>
    )
}

type DialogFooterProps = {
    onDelete: () => void,
    submitVariant?: "default" | "primary" | "secondary" | "success" | "danger" | "info" | "warning"
}

const DialogFooter = ({ onDelete, submitVariant = "danger" }: DialogFooterProps) => {

    const { onClose } = useDialog()

    return (
        <div className="mt-6 text-right space-x-4">
            <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-300 text-black py-2 px-4 rounded-lg"
            >
                Cancel
            </button>
            <Button
                onClick={onDelete}
                variant={submitVariant}
            >
                Submit
            </Button>
        </div>
    );
};

type DialogContentProps = React.ComponentPropsWithRef<"div"> & {
    hasCloseButton?: boolean,
}

const DialogContent = ({ children, className, hasCloseButton = false }: DialogContentProps) => {
    const { onClose, ref } = useDialog();

    return (
        <div
            ref={ref}
            className={cn("bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative", className)}
        >
            {hasCloseButton &&
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 text-2xl absolute right-1 top-1"
                >
                    <MdClose className="size-6" />
                </button>}

            {children}
        </div>
    );
};


Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;

export default Dialog;