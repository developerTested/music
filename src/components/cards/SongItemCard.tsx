import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentTrack, setIsPlaying, togglePlaying } from '@/redux/slices/playerSlice';
import type { TrackType } from '@/types/artist.type';
import { Button } from '../forms';
import { MdOutlinePlaylistAdd, MdPause, MdPlayArrow } from 'react-icons/md';
import { ImHeart } from 'react-icons/im';
import { formatDuration } from '@/utilities/helper';
import { toast } from 'react-toastify';
import songService from '@/service/SongService';
import { AxiosError } from 'axios';
import { setShowLoginForm } from '@/redux/slices/appSlice';

type SongItemCardProps = {
    song: TrackType,
}

export function SongItemCard({ song }: SongItemCardProps) {
    const dispatch = useAppDispatch()

    const [liked, setLiked] = useState(false);

    const { currentTrack, isPlaying } = useAppSelector(state => state.player)
    const { loggedIn } = useAppSelector((state) => state.auth)

    const handlePlay = (track: TrackType) => {

        if (currentTrack?._id === track._id) {
            dispatch(togglePlaying());
        } else {
            dispatch(setCurrentTrack(track))
            dispatch(setIsPlaying(true));
        }
    };

    const handleLikeSong = async () => {

        if (!loggedIn) {
            dispatch(setShowLoginForm(true))

            return;
        }

        if (!song?._id) {
            toast.error("Song ID is missing!");
            return;
        }

        try {
            const response = await songService.toggleFavorite(song._id);

            setLiked(response.data.favorite)
        } catch (error) {
            let errorMessage = "Something went wrong";

            if (error instanceof AxiosError) {
                errorMessage = error?.message;
            } else if (error instanceof Error) {
                errorMessage = error?.message;
            } else {
                errorMessage = "Something went wrong"
            }

            console.log(errorMessage);

            setLiked(false)
        }
    }

    useEffect(() => {

        if (!song._id && !loggedIn) {
            return;
        }

        const fetchLikedOrNot = async () => {
            try {
                const response = await songService.checkLiked(song._id);

                setLiked(response.data.favorite)

            } catch (error) {
                console.log(error);

                setLiked(false);
            }
        }


        fetchLikedOrNot();

    }, [song?._id, loggedIn]);

    return (
        <div
            key={song._id}
            className="flex items-center gap-4 p-1 group
            "
        >
            <div className="relative group">
                <img
                    src={song.cover}
                    alt={song.title}
                    className="size-14 rounded"
                />

                <Button
                    variant="icon"
                    size="icon"
                    onClick={() => handlePlay(song)}
                    className="absolute inset-0 m-auto size-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                    {currentTrack?.title === song.title && isPlaying ?
                        <MdPause className="size-6" /> :
                        <MdPlayArrow className="size-6" />}
                </Button>

            </div>
            <div className="flex-1 min-w-0">
                <div onClick={() => handlePlay(song)} className="font-semibold truncate mb-1">{song.title}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400  truncate">{song.artist?.name}</div>
            </div>
            <div className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm rounded-full">{formatDuration(song.duration)}</div>
            <div className="flex items-center gap-3">
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
    )
}
