import { MdWbSunny } from 'react-icons/md';
import { BsMoonStarsFill } from 'react-icons/bs';
import { setDarkMode } from '@/redux/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';

export default function ThemeToggle() {

    const { darkMode } = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    /**
     * Theme changer
     */
    const handleThemeToggle = () => {
        dispatch(setDarkMode(!darkMode));

        document.documentElement.classList.toggle("dark")
    }


    return (
        <div onClick={handleThemeToggle} className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 dark:text-white">
            {darkMode ? <MdWbSunny className='w-6 h-6' /> : <BsMoonStarsFill className='w-6 h-6' />}
        </div>
    )
}
