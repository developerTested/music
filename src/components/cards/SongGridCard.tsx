import type { TrackType } from "@/types/artist.type"
import { formatDate, formatDuration } from "@/utilities/helper"
import { FaImage } from "react-icons/fa"

type SongGridCardProps = {
    song?: TrackType,
}

export default function SongGridCard({ song }: SongGridCardProps) {

    if (!song) {
        return (
            <div className="relative animate-pulse">
                <div className="size-60 bg-slate-100 rounded-md flex items-center justify-center">
                    <FaImage className="size-8" />
                </div>

                <div className="w-full h-8 bg-slate-100">
                </div>
            </div>
        )
    }


    return (
        <div className="relative flex flex-col gap-2 bg-white">
            <div className="size-full  xl:size-60 rounded-lg">
                <img
                    className="size-full rounded-lg"
                    src={song.cover}
                />
            </div>

            <div className="block">
                <div className="text-2xl font-bold truncate">
                    {song.title}
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        {formatDate(song.releaseDate)}
                    </div>

                    <div className="text-sm">
                        {formatDuration(song.duration)}
                    </div>
                </div>
            </div>
        </div>
    )
}
