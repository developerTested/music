import { useState, useLayoutEffect, useRef, useCallback } from 'react';

export const useResponsive = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const timeoutRef = useRef<number | null>(null);

    const handleResize = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            setIsMobile(window.innerWidth < 768);
        }, 150);
    }, []);

    useLayoutEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleResize]);

    return isMobile;
};
