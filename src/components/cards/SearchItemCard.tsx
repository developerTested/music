import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentTrack, setIsPlaying, togglePlaying } from '@/redux/slices/playerSlice';
import { Button } from '../forms';
import { MdOutlinePlaylistAdd, MdPause, MdPlayArrow } from 'react-icons/md';
import { ImHeart } from 'react-icons/im';
import type { TrackType } from '@/types/artist.type';

type SearchItemCardProps = {
    song: TrackType,
}

export function SearchItemCard({ song }: SearchItemCardProps) {
    const dispatch = useAppDispatch()

    const [liked, setLiked] = useState(false);

    const { currentTrack, isPlaying } = useAppSelector(state => state.player)

    const handlePlay = (track: TrackType) => {

        if (currentTrack?._id === track._id) {
            dispatch(togglePlaying());
        } else {
            dispatch(setCurrentTrack(track))
            dispatch(setIsPlaying(true));
        }
    };

    const handleLikeSong = async () => {
        setLiked(!liked)
    }

    return (
        <div className={`flex items-start gap-2 p-2 ${currentTrack?._id === song._id && isPlaying ? "bg-slate-100 dark:bg-zinc-900" : "bg-white dark:bg-zinc-800 hover:dark:bg-zinc-900"} rounded-lg`}>
            <img src={song?.album?.cover || song.cover || "http://cdn-images.dzcdn.net/images/cover/1a2ff1ad7241739d524583d6f775c379/1000x1000-000000-80-0-0.jpg"} className="size-24 shrink-0 rounded-lg" />

            <div className="flex flex-col gap-2 w-full text-semibold">
                <div className="block text-lg font-semibold truncate">
                    {song.title}
                </div>
                <div className="album text-sm">
                    {song.album?.title}
                </div>
                <div className="group">
                    {song.artist.name}
                </div>
            </div>
            <div className="actions self-center shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="icon" size="icon" onClick={() => handlePlay(song)}>

                        {currentTrack?._id === song._id && isPlaying ?
                            <MdPause className="size-6" /> :
                            <MdPlayArrow className="size-6" />}
                    </Button>

                    <Button variant="icon" size="icon">
                        <MdOutlinePlaylistAdd className="size-6" />
                    </Button>

                    <Button onClick={handleLikeSong} variant="icon" size="icon" className={`${liked ? "text-red-500" : ""}`}>
                        <ImHeart className="size-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
