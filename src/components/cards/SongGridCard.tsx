import { useAppDispatch, useAppSelector } from "@/hooks"
import { setCurrentTrack, setIsPlaying, togglePlaying } from "@/redux/slices/playerSlice"
import type { TrackType } from "@/types/artist.type"
import { FaImage } from "react-icons/fa"
import { Button } from "../forms"
import { MdPause, MdPlayArrow } from "react-icons/md"
import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';

type SongGridCardProps = {
    song?: TrackType,
}

export default function SongGridCard({ song }: SongGridCardProps) {
    const { currentTrack, isPlaying } = useAppSelector(state => state.player)

    const dispatch = useAppDispatch();

    const handlePlay = (track: TrackType) => {

        if (currentTrack?._id === track._id) {
            dispatch(togglePlaying());
        } else {
            dispatch(setCurrentTrack(track))
            dispatch(setIsPlaying(true));
        }
    };


    if (!song) {
        return (
            <div className="relative animate-pulse">
                <div className="w-full h-[200px] bg-slate-100 rounded-md flex items-center justify-center">
                    <FaImage className="size-8" />
                </div>

                <div className="w-full h-8 bg-slate-100">
                </div>
            </div>
        )
    }

    return (
        <div
            className="p-4 transition-all duration-200 group cursor-pointer rounded-lg"
        >
            <div className="relative mb-2">
                <Link
                    to={`/song/${song._id}`}
                >
                    <LazyLoadImage
                        alt={song?.title}
                        src={song?.cover}
                        className="w-full aspect-square object-cover rounded-lg group-hover:brightness-75 transition-all"
                    />
                </Link>

                <Button variant="icon" size="icon" onClick={() => handlePlay(song)} className="absolute bottom-2 right-2  opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    {currentTrack?.title === song.title && isPlaying ?
                        <MdPause className="size-6" /> :
                        <MdPlayArrow className="size-6" />}
                </Button>

            </div>
            <h3 className="font-semibold truncate mb-1">{song.title}</h3>
            {song.artist && <Link
                to={`/artist/${song.artist._id}`}
                className="text-sm text-zinc-600 dark:text-zinc-200 line-clamp-2">{song.artist.name}
            </Link>
            }
        </div>
    )
}
