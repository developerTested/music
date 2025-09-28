import { useEffect, useState } from "react"
import { SongItemCard } from "@/components/cards";
import type { ArtistType, TrackType } from "@/types";
import { useParams } from "react-router-dom";
import { MUSIC_API } from "@/utilities/api";

export function ArtistPage() {

    const { artistId } = useParams();

    const [artist, setArtist] = useState<ArtistType | null>(null)

    const [songList, setSongList] = useState<TrackType[]>([])

    /**
     * Fetch Artist
     */
    const fetchArtistDetails = async () => {

        if (!artistId) {
            return;
        }

        if (!artistId.match(/[0-9]+/)) {
            return false;
        }
        
        try {
            const response = await MUSIC_API.get(`/artist/${artistId}`)

            setArtist(response.data)
        } catch (error) {
            console.log("An error while fetching artist details", error);

        }
    }

    /**
     * Fetch Artist Songs
     */
    const fetchArtistSongs = async () => {
        
        if (!artistId) {
            return;
        }

        if (!artistId.match(/[0-9]+/)) {
            return false;
        }

        try {
            const { data: response } = await MUSIC_API.get(`/artist/${artistId}/top?limit=50`)

            setSongList(response.data)
        } catch (error) {
            console.log("Failed to fetch artist songs", error);

        }
    }

    useEffect(() => {
        if (artistId) {
            fetchArtistDetails()
            fetchArtistSongs()
        }

        return () => {
            setArtist(null)
        }
    }, [artistId])


    return (
        <div className="grid">
            <div className="relative overflow-hidden flex flex-col gap-4 mt-auto w-full h-350 bg-gradient-to-b from-transparent to-black p-4 rounded-t-lg">
                <img src="/bg.jpg" alt="background" className="absolute inset-0 object-cover" />
                <div className="mt-auto flex items-center gap-2 z-10">
                    <div className="block text-8xl leading-tight font-bold text-white shadow-sm px-4 py-2">
                        {artist?.name}
                    </div>
                    <img src="/verified.svg" className="size-14 rounded-full" />
                </div>
            </div>
            <div className="block space-y-4">
                <div className="text-2xl font-semibold border-b dark:border-widget p-2">
                    Songs
                </div>
                <div className="flex flex-col gap-2">
                    {setSongList.length ? songList.map((song, i) => <SongItemCard key={i} song={song} /> ) : <div className="">No Songs!</div> }
                </div>
            </div>
        </div>
    )
}
