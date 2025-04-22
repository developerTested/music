import { MdMusicNote } from 'react-icons/md'
import { Link } from 'react-router-dom'

export function Logo() {
    return (
        <Link to="/" className="flex items-center justify-center gap-2">
            <MdMusicNote className="size-6" />

            <div className="block px-1 py-0.5 text-lg font-semibold bg-black text-white rounded-lg">
                Hub
            </div>
        </Link>
    )
}
