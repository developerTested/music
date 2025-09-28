import { Link } from 'react-router-dom'
import { Logo } from '../Logo'

export default function AdminHeader() {
    return (
        <div className="sticky top-0 w-full h-14 flex items-center justify-between px-4 py-2.5 border-b bg-white">
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

                <Link to="/">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
