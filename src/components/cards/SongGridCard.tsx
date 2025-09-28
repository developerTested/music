import { useAppDispatch, useAppSelector } from "@/hooks"
import { setCurrentTrack, setIsPlaying } from "@/redux/slices/playerSlice"
import type { TrackType } from "@/types/artist.type"
import { formatDuration } from "@/utilities/helper"
import { FaImage } from "react-icons/fa"
import { Button } from "../forms"
import { MdPause, MdPlayArrow } from "react-icons/md"

type SongGridCardProps = {
    song?: TrackType,
}

export default function SongGridCard({ song }: SongGridCardProps) {
    const { currentTrack, isPlaying } = useAppSelector(state => state.player)

    const dispatch = useAppDispatch();

    const handlePlay = (track: TrackType) => {

        dispatch(setCurrentTrack(track))
        dispatch(setIsPlaying(true));

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
        <div className="relative flex flex-col">
            <div className="w-full h-[200px] rounded-lg relative">
                <img
                    className="size-full rounded-lg object-cover"
                    src={song.cover}
                />

                <Button variant="icon" size="icon" onClick={() => handlePlay(song)} className="absolute bottom-2 right-2">

                    {currentTrack?.title === song.title && isPlaying ?
                        <MdPause className="size-6" /> :
                        <MdPlayArrow className="size-6" />}
                </Button>
            </div>

            <div className="block p-2">
                <div className="text-md font-bold truncate mb-2">
                    {song.title}
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">
                        {song.artist.name}
                    </div>

                    <div className="text-sm">
                        {formatDuration(song.duration)}
                    </div>
                </div>
            </div>
        </div>
    )
}
