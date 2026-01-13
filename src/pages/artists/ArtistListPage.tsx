import { useEffect, useState } from "react"
import artistService from "@/service/ArtistService"
import type { ArtistType } from "@/types/artist.type"
import ArtistCard from "@/components/cards/ArtistCard"

export default function ArtistListPage() {

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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 size-full">
            {artists.map((artist, i) => <ArtistCard key={i} artist={artist} />)}
        </div >
    )
}
