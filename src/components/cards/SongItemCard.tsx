import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentTrack, setIsPlaying, togglePlaying } from '@/redux/slices/playerSlice';
import type { TrackType } from '@/types';
import { Button } from '../forms';
import { MdOutlinePlaylistAdd, MdPause, MdPlayArrow } from 'react-icons/md';
import { ImHeart } from 'react-icons/im';

type SongItemCardProps = {
    song: TrackType,
}

export function SongItemCard({ song }: SongItemCardProps) {
    const dispatch = useAppDispatch()

    const [liked, setLiked] = useState(false);

    const { currentTrack, isPlaying } = useAppSelector(state => state.player)

    const handlePlay = (track: TrackType) => {

        if (currentTrack?.id === track.id) {
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
        <div className="flex items-center gap-2">
            <img src={song?.album?.cover || "http://cdn-images.dzcdn.net/images/cover/1a2ff1ad7241739d524583d6f775c379/1000x1000-000000-80-0-0.jpg"} className="size-10 shrink-0 rounded-lg" />

            <div className="block w-full text-semibold">
                {song.title}
            </div>
            <div className="actions flex items-center gap-4 shrink-0">
                <Button variant="icon" size="icon" onClick={() => handlePlay(song)}>

                    {currentTrack?.title === song.title && isPlaying ?
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
    );
}
