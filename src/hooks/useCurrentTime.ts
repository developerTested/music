import { useState, useEffect } from 'react';

export const useCurrentTime = (updateInterval: number = 1000) => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const formatTime = (date: Date): string => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            return `${hours}:${minutes}:${seconds}`;
        };

        const updateTime = () => {
            setCurrentTime(formatTime(new Date()));
        };

        updateTime();
        
        const intervalId = setInterval(updateTime, updateInterval);

        return () => clearInterval(intervalId);
    }, [updateInterval]);

    return currentTime;
};