import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setQueue } from '@/redux/slices/playerSlice';
import type { SearchType } from '@/types/artist.type';
import songService from '@/service/SongService';
import { CiSearch } from 'react-icons/ci';
import NoTracksFound from '@/components/NoTracksFound';
import AlbumGridCard from '@/components/cards/AlbumGridCard';
import ArtistCard from '@/components/cards/ArtistCard';
import { SongItemCard } from '@/components/cards';

export default function SearchPage() {

    const [searchParams] = useSearchParams();

    const { currentTrack, isPlaying } = useAppSelector(state => state.player)
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchType | null>(null);

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
                if (response.data) {
                    setResults(response.data);
                }

            } catch (error) {
                console.log(error);

            }

            setLoading(false)
        }


        fetchResults()

        return () => {
            setResults(null)
        }
    }, [q])



    useEffect(() => {

        if (!currentTrack) {
            return;
        }

        if (isPlaying) {
            dispatch(setQueue(results?.songs))
        }

    }, [currentTrack, isPlaying, dispatch, results]);


    const { songs = [], albums = [], artists = [] } = results ?? {};

    const hasAlbums = albums?.length > 0;
    const hasArtists = artists?.length > 0;
    const hasSongs = songs?.length > 0;

    const nothingFound = !hasAlbums && !hasArtists && !hasSongs;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
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
                    {hasAlbums && <section>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {albums.map((album) => (
                                <AlbumGridCard key={album._id} album={album} />
                            ))}
                        </div>
                    </section>
                    }

                    {hasArtists && <section>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {artists.map((person) => (
                                <ArtistCard key={person._id} artist={person} />
                            ))}
                        </div>
                    </section>}

                    {hasSongs && songs.map((song) => (
                        <SongItemCard key={song._id} song={song} />
                    ))}

                    {nothingFound && <NoTracksFound />}
                </div>
            }
        </div>
    )
}
