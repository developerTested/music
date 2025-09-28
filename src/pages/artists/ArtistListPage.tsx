import { useEffect, useState } from "react"
import artistService from "@/service/ArtistService"
import type { ArtistType } from "@/types/artist.type"
import { MdBookmark, MdHeadphones } from "react-icons/md"
import { Link } from "react-router-dom"

export function ArtistListPage() {

    const [artists, setArtists,] = useState<ArtistType[]>([])

    useEffect(() => {

        const fetchArtistList = async () => {
            try {
                const response = await artistService.fetchAll()
                setArtists(response)
            } catch (error) {
                console.log("An error while fetching artist details", error);
            }
        }

        fetchArtistList()

        return () => {
            setArtists([]);
        }

    }, []);

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 size-full">
            {artists.map((artist, i) => <div key={i} className="block shrink-0 w-full h-72">
                <Link to={`/artist/${artist._id}`}>
                    <img src={artist.avatar || "http://cdn-images.dzcdn.net/images/cover/1a2ff1ad7241739d524583d6f775c379/1000x1000-000000-80-0-0.jpg"}
                        className="rounded-xl size-full object-top object-cover" />
                </Link>

                <div className="relative flex flex-col gap-2 p-2">
                    <Link to={`/artist/${artist._id}`} className="text-xl font-bold">
                        {artist.name}
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MdHeadphones className="text-lg" />
                            {/* {formatNumbers(artist.listening)} */}
                        </div>
                        <div className="flex items-center gap-2">
                            <MdBookmark className="text-lg" />
                            {/* {formatNumbers(artist.listening)} */}
                        </div>
                    </div>
                </div>
            </div>)
            }
        </div >
    )
}
