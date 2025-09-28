import { Link } from 'react-router-dom'

export function AccessDenied() {
    return (
        <div className={`w-full h-screen flex items-center justify-center overflow-hidden`}>
            <div className="m-auto text-center flex flex-col items-center gap-4">
                <h1 className="title text-8xl font-semibold">
                    403 - Access Denied!
                </h1>

                <div className="mb-3 text-2xl">
                    Administrator privileges are required for this action.
                </div>

                <Link to='/' className="btn uppercase bg-gray-200 dark:bg-white/20 text-center py-2.5 px-4 rounded-full">
                    Go to home
                </Link>
            </div>
        </div>

    )
}
