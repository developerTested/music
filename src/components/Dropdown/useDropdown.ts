import { createContext, useContext } from "react";
import type { DropdownContextType } from "./type";


// Create context with undefined default
export const DropdownContext = createContext<DropdownContextType| undefined>(undefined);

export const useDropdown = () => {
    
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a DropdownProvider");
    }


    return context;
};