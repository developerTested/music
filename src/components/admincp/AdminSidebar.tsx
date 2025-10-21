import { FaUsers } from "react-icons/fa";
import { MdAlbum, MdHome, MdMusicNote } from "react-icons/md"
import { NavLink } from "react-router-dom";

const menuItems = [
    {
        title: "Home",
        url: "/admincp",
        icon: <MdHome className="size-6" />,
    },
    {
        title: "Songs",
        url: "/admincp/songs",
        icon: <MdMusicNote className="size-6" />,
    },
    {
        title: "Albums",
        url: "/admincp/albums",
        icon: <MdAlbum className="size-6" />,
    },
    {
        title: "Artists",
        url: "/admincp/artists",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-6">
            <path
                fill="currentColor"
                d="M256 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C127.8 304 48 383.8 48 482.3 48 498.7 61.3 512 77.7 512l195.8 0c-1-5.2-1.5-10.6-1.5-16.2 0-31.8 17.3-56.8 37.9-72.3 12.3-9.3 26.7-15.9 42.1-19.7l0-87c-20.5-8.2-42.9-12.7-66.3-12.7l-59.4 0zM624 256c0-7.1-3.2-13.9-8.6-18.4s-12.7-6.5-19.7-5.2l-176 32c-11.4 2.1-19.7 12-19.7 23.6l0 161.6c-5.9-1.1-11.4-1.6-16-1.6-9.5 0-22.9 2.1-34.9 7.5-11.1 5-29.1 17.2-29.1 40.5s18 35.4 29.1 40.5c11.9 5.4 25.4 7.5 34.9 7.5s22.9-2.1 34.9-7.5c11.1-5 29.1-17.2 29.1-40.5l0-139.9 128-23.3 0 84.9c-5.9-1.1-11.4-1.6-16-1.6-9.5 0-22.9 2.1-34.9 7.5-11.1 5-29.1 17.2-29.1 40.5s18 35.4 29.1 40.5c11.9 5.4 25.4 7.5 34.9 7.5s22.9-2.1 34.9-7.5c11.1-5 29.1-17.2 29.1-40.5l0-208z"
            />
        </svg>

    },
    {
        title: "Users",
        url: "/admincp/users",
        icon: <FaUsers className="size-6" />
    },
]

export default function AdminSidebar() {

    return (
        <aside className="
        fixed
        left-0
        top-14
        w-60
        h-full
bg-inherit
border-r 
dark:border-zinc-800
">
            <div className="menu-container flex flex-col pr-2 py-2">
                {menuItems.map((menu, i) => <NavLink
                    key={i}
                    to={menu.url}
                    end={true}
                    className={({ isActive }) => `
                    flex
                    items-center
                    gap-4
                    px-4
                    py-2.5 
                    ${isActive ? "bg-black dark:bg-zinc-900 text-white" : ""}
                    hover:bg-zinc-800
                    dark:hover:bg-zinc-800
                    hover:text-white
                rounded-r-full`
                    }>
                    <div className="icon">
                        {menu.icon}
                    </div>
                    <div className="block">
                        {menu.title}
                    </div>
                </NavLink>)}

            </div>
        </aside >
    )
}
