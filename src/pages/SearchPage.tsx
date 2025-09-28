import { useEffect, useState } from 'react'
import { SearchItemCard } from '@/components/cards';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setQueue } from '@/redux/slices/playerSlice';
import type { TrackType } from '@/types/artist.type';
import songService from '@/service/SongService';
import { CiSearch } from 'react-icons/ci';

export function SearchPage() {

    const [searchParams] = useSearchParams();

    const { currentTrack, isPlaying } = useAppSelector(state => state.player)
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<TrackType[]>([]);

    const q = searchParams.get("q")


    useEffect(() => {
        const fetchResults = async () => {

            if (!q) {
                return false;
            }

            setLoading(true)

            const url = encodeURIComponent(q);

            try {
                const response = await songService.search(url);
                setResults(response.data);

            } catch (error) {
                console.log(error);

            }

            setLoading(false)
        }


        fetchResults()

        return () => {
            setResults([])
        }
    }, [q])



    useEffect(() => {

        if (!currentTrack) {
            return;
        }

        if (isPlaying) {
            dispatch(setQueue(results))
        }

    }, [currentTrack, isPlaying, dispatch, results]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <span>
                        <CiSearch className="w-6" />
                    </span>
                    <span className="text-lg">
                        {q ? `Search results for ${q}` : "Search"}
                    </span>
                </h2>
            </div>

            {loading ? <div className="">
                Loading...
            </div> :

                <div className="grid gap-2">
                    {results.map((song: TrackType) => <SearchItemCard key={song._id} song={song} />)}
                </div>
            }
        </div>
    )
}
