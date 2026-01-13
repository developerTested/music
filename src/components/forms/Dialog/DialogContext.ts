import { createContext, useContext, type RefObject } from "react";

type DialogContextType = {
    open: boolean;
    onClose: () => void;
    size?: string;
    ref?: RefObject<HTMLDivElement | null>,
};

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};
