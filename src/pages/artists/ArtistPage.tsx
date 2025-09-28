import { useEffect, useState } from "react"
import { SongItemCard } from "@/components/cards";
import type { ArtistType, TrackType } from "@/types/artist.type";
import { useParams } from "react-router-dom";
import artistService from "@/service/ArtistService";

export function ArtistPage() {

    const { artistId } = useParams();

    const [artist, setArtist] = useState<ArtistType | null>(null)

    const [songList, setSongList] = useState<TrackType[]>([])

    useEffect(() => {
        /**
         * Fetch Artist
         */
        const fetchArtistDetails = async () => {

            if (!artistId) {
                return;
            }

            try {
                const response = await artistService.getArtistById(artistId)

                const { songs, ...artist } = response;

                setArtist(artist)

                if (songs) {
                    setSongList(songs);
                }

            } catch (error) {
                console.log("An error while fetching artist details", error);
            }
        }

        if (artistId) {
            fetchArtistDetails()
        }

        return () => {
            setArtist(null)
        }
    }, [artistId])


    return (
        <div className="grid">
            <div className="relative overflow-hidden flex flex-col gap-4 mt-auto w-full h-350 bg-gradient-to-b from-transparent to-black p-4 rounded-t-lg">
                <img src={artist?.banner || "/bg.jpg"} alt="background" className="absolute inset-0 object-cover" />
                <div className="mt-auto flex items-center gap-2 z-10">

                    <div className="block text-8xl leading-tight font-bold text-white drop-shadow-2xl/50 px-4 py-2">
                        {artist?.name}
                    </div>
                    {artist?.verified &&
                        <img src="/verified.svg" className="size-14 rounded-full" />}
                </div>
            </div>
            <div className="block space-y-4">
                <div className="text-2xl font-semibold border-b dark:border-widget p-2">
                    Songs
                </div>
                <div className="flex flex-col gap-2">
                    {setSongList.length ? songList.map((song, i) => <SongItemCard key={i} song={song} />) : <div className="">No Songs!</div>}
                </div>
            </div>
        </div>
    )
}
