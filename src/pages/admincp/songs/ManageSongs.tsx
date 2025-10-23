import { Button, Dialog } from "@/components/forms"
import type { TrackType } from "@/types/artist.type"
import { useEffect, useRef, useState } from "react"
import { FaPause, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import { FaPlay, FaEdit, FaTrash } from 'react-icons/fa';
import songService from "@/service/SongService"
import { AxiosError } from "axios"
import Alert from "@/components/Alert"
import { formatDate, formatDuration } from "@/utilities/helper"
import Tooltip from "@/components/Tooltip"
import { Skeleton } from "@/components"
import { toast } from "react-toastify"

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
                {loading ? Array.from(new Array(5)).map((_, i) => <SongCard key={i} />)
                    : songList.map((song) => (<SongCard song={song} loading={false} fetchSongs={fetchSongList} />))}
            </div>


            {errorMessage && <Alert message={errorMessage} />}
        </div>
    )
}


type SongCardProps = {
    song?: TrackType;
    loading?: boolean;
    fetchSongs?: () => void,
};

const SongCard = ({ song, loading = false, fetchSongs }: SongCardProps) => {
    const [play, setPlay] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [showDialog, setShowDialog] = useState(false);

    const toggleDialog = () => setShowDialog(prev => !prev)

    const handleDeleteSong = async (songId: string) => {
        try {
            const response = await songService.removeSong(songId);
            setShowDialog(false);
            toast.success(response.message)

            if (fetchSongs) {
                fetchSongs()
            }

        } catch (error) {
            let errorMessage = "Something went wrong";

            if (error instanceof AxiosError) {
                errorMessage = error?.message;
            } else if (error instanceof Error) {
                errorMessage = error?.message;
            } else {
                errorMessage = "Something went wrong"
            }

            toast.error(errorMessage || "Something went wrong while deleting Song.")
        }
    }

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

    if (loading || !song) {
        return (
            <div className="animate-pulse p-2 bg-white dark:bg-zinc-800 rounded-lg overflow-hidden flex flex-col sm:flex-row items-center gap-4">
                <Skeleton className="size-24" />
                <div className="flex-1 flex flex-col gap-4">
                    <Skeleton className="h-8" />
                    <div className="flex">
                        <Skeleton className="h-6" />
                        <div className="flex gap-4 px-4">
                            <Skeleton className="size-6 rounded-full" />
                            <Skeleton className="size-6 rounded-full" />
                            <Skeleton className="size-6 rounded-full" />
                        </div>
                    </div>
                    <Skeleton className="h-6" />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-zinc-900 p-1 rounded-lg overflow-hidden flex flex-col sm:flex-row items-center">
            {/* Album Art */}
            <img
                src={song.cover}
                alt={`${song.title} cover`}
                className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
            />

            {/* Song Info */}
            <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-lg font-semibold truncate">{song.title}</h3>
                <p className="text-sm truncate">{song.artist.name}</p>
                <p className="text-xs mt-auto">{formatDate(song.releaseDate)} • {formatDuration(song.duration)}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-4 sm:mt-0 px-4">
                <Tooltip title={play ? 'Pause' : 'Play'}>
                    <button
                        onClick={togglePlay}
                        aria-label={play ? 'Pause song' : 'Play song'}
                        title={play ? 'Pause' : 'Play'}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        {play ? <FaPause /> : <FaPlay />}
                    </button>
                </Tooltip>
                <Tooltip title="Edit">
                    <Link
                        to={`/admincp/songs/${song._id}`}
                        aria-label="Edit song"
                        title="Edit"
                        className="text-green-500 hover:text-green-700"
                    >
                        <FaEdit />
                    </Link>
                </Tooltip>
                <button
                    onClick={toggleDialog}
                    aria-label="Delete song"
                    title="Delete"
                    className="text-red-500 hover:text-red-700"
                >
                    <FaTrash />
                </button>
            </div>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={song.fileUrl} className="hidden" />

            <Dialog open={showDialog} onClose={toggleDialog}>
                <Dialog.Header title="Delete Song" />
                <Dialog.Content>
                    Are you sure you want to delete this Song?
                </Dialog.Content>
                <Dialog.Footer onDelete={() => handleDeleteSong(song._id)} />
            </Dialog>
        </div>
    );
};