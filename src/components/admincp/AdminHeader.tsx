import { Link } from 'react-router-dom'
import Logo from '../Logo'
import ThemeToggle from '../ThemeToggle'

export default function AdminHeader() {
    return (
        <div className="sticky top-0 z-1030 w-full h-14 flex items-center justify-between px-4 py-2.5 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800">
            <div className="flex items-center gap-4">
                <Logo />
                <span className="font-bold text-lg">
                    Admin Panel
                </span>
            </div>

            <div className="menu-right flex items-center gap-4">
                <p>
                    Welcome, Admin!
                </p>

                <ThemeToggle />

                <Link to="/">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
