import { useEffect, useState } from "react";

type UseDarkModeReturn = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export function useDarkMode(): UseDarkModeReturn {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem("dark-mode");

        if (saved !== null) return JSON.parse(saved) as boolean;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", isDarkMode);

        localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode];
}
