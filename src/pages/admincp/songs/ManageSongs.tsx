import { Button } from "@/components/forms"
import type { TrackType } from "@/types/artist.type"
import { useEffect, useRef, useState } from "react"
import { FaPause, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"

export function ManageSongs() {

    const [songList, setSongList] = useState<TrackType[]>([])

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchSongList = async () => {

        setLoading(true)

        try {
            const response = await songService.fetchAll();
            setSongList(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error?.message);
            } else if (error instanceof Error) {
                setErrorMessage(error?.message);
            } else {
                setErrorMessage("Something went wrong")
            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSongList()

        return () => {
            setErrorMessage(null);
            setSongList([])
        }
    }, [])



    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Manage Songs
                </h2>

                <Link
                    to={"/admincp/songs/create"}
                >
                    <Button
                        startIcon={<FaPlus className="size-6" />}
                    >
                        Add a new Song
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {songList.map((song) => (<SongCard song={song} />))}
            </div>


            {errorMessage && <Alert message={errorMessage} />}
        </div>
    )
}

import { FaPlay, FaEdit, FaTrash } from 'react-icons/fa';
import songService from "@/service/SongService"
import { AxiosError } from "axios"
import Alert from "@/components/Alert"
import { formatDate, formatDuration } from "@/utilities/helper"

type SongCardProps = {
    song: TrackType;
};

const SongCard = ({ song }: SongCardProps) => {
    const [play, setPlay] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Sync playback with state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (play) {
            audio.play().catch(err => {
                console.error('Playback failed:', err);
                setPlay(false);
            });
        } else {
            audio.pause();
        }
    }, [play]);

    const togglePlay = () => {
        setPlay(prev => !prev);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row items-center">
            {/* Album Art */}
            <img
                src={song.cover}
                alt={`${song.title} cover`}
                className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
            />

            {/* Song Info */}
            <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{song.title}</h3>
                <p className="text-sm text-gray-600 truncate">{song.artist.name}</p>
                <p className="text-xs text-gray-500 mt-auto">{formatDate(song.releaseDate)} • {formatDuration(song.duration)}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                    onClick={togglePlay}
                    aria-label={play ? 'Pause song' : 'Play song'}
                    title={play ? 'Pause' : 'Play'}
                    className="text-blue-500 hover:text-blue-700"
                >
                    {play ? <FaPause /> : <FaPlay />}
                </button>
                <Link
                    to={`/admincp/songs/${song._id}`}
                    aria-label="Edit song"
                    title="Edit"
                    className="text-green-500 hover:text-green-700"
                >
                    <FaEdit />
                </Link>
                <button
                    aria-label="Delete song"
                    title="Delete"
                    className="text-red-500 hover:text-red-700"
                >
                    <FaTrash />
                </button>
            </div>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={song.fileUrl} className="hidden" />
        </div>
    );
};

export default SongCard;
