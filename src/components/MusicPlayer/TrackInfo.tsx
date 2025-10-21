import type { TrackType } from '@/types/artist.type'
import React from 'react'

type TrackInfoProps = {
    currentTrack: TrackType | null,
    isPlaying: boolean,
}

export default function TrackInfo({ currentTrack, isPlaying }: TrackInfoProps) {
    return (
        <div className="w-350 absolute bottom-full mb-2 md:relative md:mb-0 track-info flex items-center gap-4">
            {currentTrack ? <React.Fragment>
                <div className={`relative flex items-center justify-center ${isPlaying ? "rounded-full" : "rounded-lg"} cover w-14 h-14 shrink-0`}>
                    {isPlaying ? <div className="size-2 absolute inset-auto bg-white border-2 z-10 rounded-full"></div> : ""}

                    <img src={currentTrack.album?.cover || currentTrack.cover} className={`size-full block ${isPlaying ? "animate-spin rounded-full" : "rounded-lg"}`} />
                </div>
                <div className="hidden lg:block max-w-md overflow-hidden">
                    <h3 className="title text-lg font-semibold truncate">
                        {currentTrack.title}
                    </h3>
                    <h4 className="truncate">
                        {currentTrack.artist?.name}
                    </h4>
                </div>
            </React.Fragment> : ""}
        </div>
    )
}
