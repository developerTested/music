import { artists } from "@/data"
import { formatNumbers } from "@/utilities/helper"
import { MdBookmark, MdHeadphones } from "react-icons/md"
import { Link } from "react-router-dom"

type ArtistType = {
    name: string,
    fullName: string,
    country: string,
    followers: number,
    listening: number,
    rank: number,
    image: string,
}

export function ArtistListPage() {

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 size-full">
            {artists.map((artist, i) => <div key={i} className="block shrink-0">
                <Link to={`/artist/${artist.fullName}`}>
                    <img src="http://cdn-images.dzcdn.net/images/cover/1a2ff1ad7241739d524583d6f775c379/1000x1000-000000-80-0-0.jpg" className="rounded-xl" />
                </Link>

                <Link to={`/artist/${artist.fullName}`} className="text-xl font-semibold">
                    {artist.fullName}
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <MdHeadphones className="text-lg" />
                        {formatNumbers(artist.listening)}
                    </div>
                    <div className="flex items-center gap-2">
                        <MdBookmark className="text-lg" />
                        {formatNumbers(artist.listening)}
                    </div>
                </div>
            </div>)
            }
        </div >
    )
}
