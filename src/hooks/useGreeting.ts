import { useState, useEffect } from 'react';

export function useTimeBasedGreeting() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const getGreeting = () => {
            const hour = new Date().getHours();

            if (hour >= 5 && hour < 12) return 'Good morning';
            if (hour >= 12 && hour < 17) return 'Good afternoon';
            if (hour >= 17 && hour < 21) return 'Good evening';
            return 'Good night';
        };

        const updateGreeting = () => setGreeting(getGreeting());

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);

        return () => clearInterval(interval);
    }, []);

    return greeting;
}