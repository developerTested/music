import { BsHeadphones } from 'react-icons/bs'
import { MdMusicNote } from 'react-icons/md'
import { Link } from 'react-router-dom'

export function Logo() {

    return (
        <Link to="/" className="flex items-center justify-center gap-2">
            <div className="flex items-center space-x-2">
                <BsHeadphones className='size-8' />
                <span className="text-3xl font-bold">Melodify</span>
            </div>
        </Link>
    )
}
