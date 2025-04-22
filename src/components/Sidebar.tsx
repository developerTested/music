import { useEffect, useState } from "react";
import { MdAlbum, MdExplore, MdHome, MdMusicNote, MdPeople } from "react-icons/md"
import { IoStatsChartSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    {
        title: "Home",
        url: "/",
        icon: <MdHome className="w-6 h-6" />,
    },
    {
        title: "Explore",
        url: "/explore",
        icon: <MdExplore className="w-6 h-6" />,
    },
    {
        title: "Songs",
        url: "/songs",
        icon: <MdMusicNote className="w-6 h-6" />,
    },
    {
        title: "Albums",
        url: "/albums",
        icon: <MdAlbum className="w-6 h-6" />,
    },
    {
        title: "Top Charts",
        url: "/top-charts",
        icon: <IoStatsChartSharp className="w-6 h-6" />,
    },
    {
        title: "Artists",
        url: "/artists",
        icon: <MdPeople className="w-6 h-6" />
    },
]

export function Sidebar() {

    const [activeMenu, setActiveMenu] = useState("/");

    const location = useLocation();

    useEffect(() => {
        setActiveMenu(location.pathname)
    }, [location]);

    return (
        <div className="
        sidebar
        fixed
        top-14
        left-0
        bg-white
        dark:bg-widget
        dark:text-slate-300
        border-r
        dark:border-widget
        w-60
        custom-h
        ">
            <div className="menu-container flex flex-col pr-2 py-2">
                {menuItems.map((menu, i) => <Link key={i} to={menu.url} className={`flex items-center gap-4 px-4 py-2.5 ${activeMenu === menu.url ? "bg-black dark:bg-input text-white" : ""} hover:bg-black dark:hover:bg-input hover:text-white rounded-r-full`}>
                    <div className="icon">
                        {menu.icon}
                    </div>
                    <div className="block">
                        {menu.title}
                    </div>
                </Link>)}

            </div>
        </div>
    )
}
