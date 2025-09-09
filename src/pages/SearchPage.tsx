import { useEffect, useState } from 'react'
import { SearchItemCard } from '@/components/cards';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setQueue } from '@/redux/slices/playerSlice';
import { MUSIC_API } from '@/utilities/api';

export function SearchPage() {

    const [searchParams, _] = useSearchParams();

    const { currentTrack, isPlaying } = useAppSelector(state => state.player)
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const q = searchParams.get("q")

    const fetchResults = async () => {

        if (!q) {
            return false;
        }

        setLoading(true)

        const url = `/search?limit=25&q=` + encodeURIComponent(q);

        try {
            const { data: response } = await MUSIC_API.get(url);
            setResults(response.data);

        } catch (error) {
            console.log(error);

        }

        setLoading(false)
    }

    useEffect(() => {
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

    }, [currentTrack, isPlaying, dispatch]);

    return (
        <div>
            <h1>Search</h1>

            {loading ? <div className="">
                Loading...
            </div> :

                <div className="grid gap-2">
                    {results.map((song: any) => <SearchItemCard key={song.id} song={song} />)}
                </div>
            }
        </div>
    )
}
