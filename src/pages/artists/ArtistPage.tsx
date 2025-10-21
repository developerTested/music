import { useEffect, useState } from "react"
import { SongItemCard } from "@/components/cards";
import type { ArtistType, TrackType } from "@/types/artist.type";
import { useParams } from "react-router-dom";
import artistService from "@/service/ArtistService";
import { FollowButton } from "@/components";
import { FaUserPlus } from "react-icons/fa";
import { useAppSelector } from "@/hooks";
import NoTracksFound from "@/components/NoTracksFound";

export function ArtistPage() {

    const { artistId } = useParams();

    const [artist, setArtist] = useState<ArtistType | null>(null)

    const [songList, setSongList] = useState<TrackType[]>([])

    const { user } = useAppSelector(state => state.auth)

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
        <div className="grid grid-cols-1 gap-2">
            {/* Artist Banner Section */}
            <div className="relative h-[350px] rounded-t-lg overflow-hidden">
                <img
                    src={artist?.banner || "/bg.jpg"}
                    alt="background"
                    className="absolute inset-0 z-0 w-full h-full object-cover"
                />
                <div className=" absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-4 px-4 py-2">
                    <div className="flex items-center gap-4">
                        <h1 className="text-white text-5xl font-bold drop-shadow-lg">
                            {artist?.name}
                        </h1>
                        {artist?.verified && (
                            <img src="/verified.svg" alt="Verified" className="w-8 h-8" />
                        )}
                    </div>

                    {/* Stats + Follow Button */}
                    <div className="flex justify-between items-center">
                        <div className="text-white">
                            <span>{artist?.country}</span> • <span>{artist?.followers} followers</span>
                        </div>

                        {user &&
                            <FollowButton
                                startIcon={<FaUserPlus />}
                                artistId={artist?._id}
                                className="rounded-full"
                            />
                        }
                    </div>
                </div>
            </div>

            {/* Songs Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold border-b border-zinc-300 dark:border-zinc-800 pb-2">
                    Songs
                </h2>
                <div className="flex flex-col gap-2">
                    {songList.length > 1 ? (
                        songList.map((song, i) => <SongItemCard key={i} song={song} />)
                    ) : (
                        <NoTracksFound
                            title="No songs available"
                            message="This artist hasn't uploaded any songs yet. Check back soon or explore similar artists!"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
