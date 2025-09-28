import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "./Button";
import { createContext, type ReactNode, useContext } from "react";

type DialogContextType = {
    open: boolean;
    onClose: () => void;
    size?: string;
};

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

const dialogStyles = cva('bg-white shadow-lg rounded-lg p-2', {
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
    if (!open) return null;

    return (
        <DialogContext.Provider value={{ open, onClose }}>
            <dialog open={open} onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
                    <div className={twMerge(dialogStyles({ size }), className)}>
                        {children}
                    </div>
                </div>
            </dialog>
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

const DialogFooter = () => {

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
            >
                Submit
            </Button>
        </div>
    );
};

type DialogContentProps = {
    children: ReactNode,
}

const DialogContent = ({ children }: DialogContentProps) => {
    return (
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {children}
        </div>
    )
}

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;

export { Dialog };

