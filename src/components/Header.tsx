import { Link } from "react-router-dom";
import { Button, SearchForm } from "./forms";
import { Logo } from "./Logo";
import { MdLightMode  } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDarkMode } from "@/redux/slices/appSlice";

export function Header() {

    const dispatch = useAppDispatch()
    const { darkMode } = useAppSelector(state => state.app)


    const handleThemeToggle = () => {
        dispatch(setDarkMode(!darkMode));

        document.documentElement.classList.toggle("dark")
    }

    return (
        <div className="header flex items-center justify-between z-1030 sticky top-0 w-full h-14 bg-white dark:bg-widget border-b dark:border-widget px-4">
            <Logo />

            <SearchForm />

            <div className="flex items-center gap-2">

                <Button onClick={handleThemeToggle} variant="icon" size="icon">
                    {darkMode ? <MdLightMode className="size-6" /> : <BsMoonStarsFill className="size-6" />}
                </Button>

                <Link to="/login" className="px-4 py-2 bg-black text-white rounded-md">
                    Login
                </Link>
            </div>
        </div>
    )
}
