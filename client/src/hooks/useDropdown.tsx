import { useState, useEffect, useRef, RefObject } from 'react';

interface DropdownHook {
    isDropOpen: boolean;
    setIsDropOpen: (isOpen: boolean) => void;
    dropdownRef: RefObject<HTMLDivElement | null>;
    toggleDropdown: () => void;
    handleDropClose: () => void;
}

export const useDropdown = (): DropdownHook => {
    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = (): void => {
        setIsDropOpen(!isDropOpen);
    };

    const handleDropClose = (): void => {
        setIsDropOpen(false);
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { isDropOpen, setIsDropOpen, dropdownRef, toggleDropdown, handleDropClose };
};
