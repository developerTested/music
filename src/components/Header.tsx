import { Link, useNavigate } from "react-router-dom";
import { Button, SearchForm } from "./forms";
import { Logo } from "./Logo";
import { MdLightMode, MdMenu } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDarkMode, setMiniMenu, setMobileMenu } from "@/redux/slices/appSlice";
import { toast } from "react-toastify";
import authService from "@/service/AuthService";
import type { ToastErrorType, ToastResponseType } from "@/types/api";
import { resetUser } from "@/redux/slices/authSlice";
import { ImExit } from "react-icons/im";
import Tooltip from "./Tooltip";
import { useCallback, useLayoutEffect } from "react";
import Avatar from "./Avatar";
import { Dropdown, DropdownContent, DropdownHeader, DropdownItem, DropdownSeparator, DropdownTrigger } from "./Dropdown";
import { cn } from "@/utilities/helper";

export function Header() {

    const dispatch = useAppDispatch()
    const { darkMode, mobileMenu, miniMenu } = useAppSelector(state => state.app)
    const { user } = useAppSelector(state => state.auth)

    const navigate = useNavigate();

    const handleLogout = () => {
        toast.promise(authService.logout(), {
            pending: "Please wait...",
            success: {
                render: ({ data }: ToastResponseType) => {

                    dispatch(resetUser());

                    navigate("/login")

                    return data.message || "Account created Successful"
                }
            },
            error: {
                render: ({ data }: ToastErrorType) => {
                    return data.message || "Something went wrong while creating your account!"
                }
            }
        })
    }

    // All Menu
    const menuToggle = useCallback(() => {
        dispatch(setMiniMenu(false));
    }, [dispatch])

    // Mobile Menu
    const mobileMenuToggle = useCallback(() => {

        const newState = !mobileMenu;


        dispatch(setMiniMenu(false));
        console.log("before", mobileMenu, newState);

        dispatch(setMobileMenu(newState));

        
        console.log("after", mobileMenu, newState);

    }, [dispatch, mobileMenu])

    // Mini Menu
    const miniMenuToggle = useCallback(() => {
        dispatch(setMobileMenu(false));
        dispatch(setMiniMenu(!miniMenu));
    }, [dispatch, miniMenu])

    /**
     * Theme changer
     */
    const handleThemeToggle = () => {
        dispatch(setDarkMode(!darkMode));

        document.documentElement.classList.toggle("dark")
    }

    /**
     * Handle Menu
     */
    const handleResize = useCallback(() => {
        const width = window.innerWidth;

        if (width > 768 && width < 1280) {
            if (!miniMenu) miniMenuToggle();
        } else {
            if (mobileMenu || miniMenu) menuToggle();
        }
    }, [miniMenu, mobileMenu, miniMenuToggle, menuToggle]);



    useLayoutEffect(() => {

        window.addEventListener('resize', handleResize, true)

        return () => {
            window.removeEventListener('resize', handleResize, true)
        }

    }, [handleResize]);

    return (
        <div className={cn(
            "header",
            "flex items-center justify-between",
            "fixed top-0 left-0 right-0 z-100",
            "w-full",
            "p-2",
            "bg-white dark:bg-zinc-900",
            "border-b dark:border-zinc-900",
            "shadow-sm"
        )}>

            <div className="flex items-center gap-2">

                <Button
                    onClick={mobileMenuToggle}
                    variant="icon"
                    size="icon"
                    className="block md:hidden mobile-menu-toggle"
                >
                    <MdMenu className="size-6" />
                </Button>

                <Button
                    onClick={miniMenuToggle}
                    variant="icon"
                    size="icon"
                    className="hidden sm:block mini-menu-toggle"
                >
                    <MdMenu className="size-6" />
                </Button>

                <Logo />
            </div>


            <SearchForm />


            <div className="flex items-center gap-2">
                <Tooltip
                    position="bottom-center"
                    title={darkMode ? "Light Mode" : "Dark Mode"}
                >
                    <Button onClick={handleThemeToggle} variant="icon" size="icon">
                        {darkMode ? <MdLightMode className="size-6" /> : <BsMoonStarsFill className="size-6" />}
                    </Button>
                </Tooltip>


                {user ?
                    <div className="flex items-center gap-2">

                        {user.role === "ADMIN" && <Link to={`/admincp`}>
                            Admin Control Panel
                        </Link>}

                        <Dropdown>
                            <DropdownTrigger asChild>
                                <Avatar
                                    alt={user.fullName}
                                    size="sm"
                                />
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownHeader>My Profile</DropdownHeader>
                                <DropdownItem>
                                    <Link to={`/@/${user.username}`}>
                                        Profile
                                    </Link>
                                </DropdownItem>

                                <DropdownSeparator />

                                <DropdownItem
                                    onClick={handleLogout}
                                >
                                    <ImExit />
                                    <span>Logout</span>
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleLogout}
                                endIcon={<ImExit />}
                            >
                                <span className="hidden md:block">
                                    Logout
                                </span>
                            </Button>
                        </div>
                    </div>
                    :

                    <div className="flex items-center gap-2">
                        <Link to="/auth/login" className="px-4 py-2 bg-black text-white rounded-md">
                            Login
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
