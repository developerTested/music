import { BsHeadphones } from 'react-icons/bs'
import { MdMusicNote } from 'react-icons/md'
import { Link } from 'react-router-dom'

export function Logo() {

    return (
        <Link to="/" className="flex items-center justify-center gap-2">

            <div className="flex items-center space-x-2">
                <BsHeadphones className='size-6' />
                <span className="text-xl font-bold">Melodify</span>
            </div>

            <MdMusicNote className="size-6" />

            <div className="block px-1 py-0.5 text-lg font-semibold bg-black text-white rounded-lg">
                Hub
            </div>
        </Link>
    )
}
