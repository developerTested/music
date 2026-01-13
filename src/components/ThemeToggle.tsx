import { MdWbSunny } from 'react-icons/md';
import { BsMoonStarsFill } from 'react-icons/bs';

import { useDarkMode } from "@/hooks/useDarkMode"
import Tooltip from './Tooltip';

export default function ThemeToggle() {

    const [darkMode, setDarkMode] = useDarkMode();

    /**
     * Theme changer
     */
    const handleThemeToggle = () => {
        setDarkMode(prev => !prev)
    }

    return (
        <Tooltip
            position="bottom-center"
            title={darkMode ? "Light Mode" : "Dark Mode"}
        >

            <div onClick={handleThemeToggle} className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 dark:text-white">
                {darkMode ? <MdWbSunny className='w-6 h-6' /> : <BsMoonStarsFill className='w-6 h-6' />}
            </div>
        </Tooltip>
    )
}
