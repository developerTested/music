import React, { useEffect, useRef, useState } from 'react'
import { DropdownContext } from './useDropdown';

type DropdownProps = {
    children: React.ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleOpen = () => setOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <DropdownContext.Provider value={{ open, toggleOpen }}>
            <div ref={dropdownRef} className="dropdown relative block w-fit">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;