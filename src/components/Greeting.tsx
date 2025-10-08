import { useCurrentTime } from '@/hooks';
import { useState, useEffect } from 'react';

export function Greeting() {
    const [greeting, setGreeting] = useState('');

    const currentTime = useCurrentTime()

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();

            if (hour >= 5 && hour < 12) {
                setGreeting('Good morning');
            } else if (hour >= 12 && hour < 17) {
                setGreeting('Good afternoon');
            } else if (hour >= 17 && hour < 21) {
                setGreeting('Good evening');
            } else {
                setGreeting('Good night');
            }
        };

        updateGreeting();

        const interval = setInterval(updateGreeting, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return <h1 className="text-4xl font-bold mb-2" > {greeting} {currentTime}  </h1>;
}