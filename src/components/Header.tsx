import { Link, useNavigate } from "react-router-dom";
import { Button, SearchForm } from "./forms";
import { Logo } from "./Logo";
import { MdLightMode, MdMenu } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDarkMode, setMiniMenu, setMobileMenu } from "@/redux/slices/appSlice";
import { useCallback, useLayoutEffect } from "react";
import Avatar from "./Avatar";
import { toast } from "react-toastify";
import authService from "@/service/AuthService";
import type { ToastErrorType, ToastResponseType } from "@/types/api";
import { resetUser } from "@/redux/slices/authSlice";
import { ImExit } from "react-icons/im";

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

    const menuToggle = useCallback(() => {
        dispatch(setMiniMenu(false));
        dispatch(setMobileMenu(false));
    }, [dispatch])

    const mobileMenuToggle = useCallback(() => {
        dispatch(setMiniMenu(false));
        dispatch(setMobileMenu(!mobileMenu));
    }, [dispatch, mobileMenu])


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
        if (window.innerWidth > 768 && window.innerWidth < 1280) {
            miniMenuToggle()
        } else {
            menuToggle()
        }
    }, [menuToggle, miniMenuToggle])



    useLayoutEffect(() => {

        window.addEventListener('resize', handleResize, true)

        return () => {
            window.removeEventListener('resize', handleResize, true)
        }

    }, [handleResize]);

    return (
        <div className="
        header
        flex
        items-center
        justify-between
        z-1030 
        sticky 
        top-0 
        w-full
        px-4
        ">

            <div className="flex items-center gap-2">
                {!mobileMenu && !miniMenu &&
                    <Button
                        onClick={menuToggle}
                        variant="icon"
                        size="icon"
                    >
                        <MdMenu className="size-6" />
                    </Button>
                }

                {mobileMenu &&
                    <Button
                        onClick={mobileMenuToggle}
                        variant="icon"
                        size="icon"
                    >
                        <MdMenu className="size-6" />
                    </Button>
                }

                {
                    miniMenu &&
                    <Button
                        onClick={miniMenuToggle}
                        variant="icon"
                        size="icon"
                    >
                        <MdMenu className="size-6" />
                    </Button>
                }

                <Logo />
            </div>


            <SearchForm />


            <div className="flex items-center gap-2">
                <Button onClick={handleThemeToggle} variant="icon" size="icon">
                    {darkMode ? <MdLightMode className="size-6" /> : <BsMoonStarsFill className="size-6" />}
                </Button>


                {user ?
                    <div className="flex items-center gap-2">
                        <Avatar alt={user.fullName} />

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleLogout}
                                endIcon={<ImExit />}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                    :

                    <div className="flex items-center gap-2">
                        <Link to="/login" className="px-4 py-2 bg-black text-white rounded-md">
                            Login
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
