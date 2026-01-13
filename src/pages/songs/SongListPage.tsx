import { useCallback, useEffect, useState } from "react";
import Alert from "@/components/Alert";
import SongGridCard from "@/components/cards/SongGridCard";
import { Button } from "@/components/forms";
import songService from "@/service/SongService";
import type { PaginationType, TrackType } from "@/types/artist.type";
import { AxiosError } from "axios";
import Pagination from "@/components/Pagination";
import genreService from "@/service/GenreService";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setGenreList } from "@/redux/slices/musicSlice";
import NoTracksFound from "@/components/NoTracksFound";

export default function SongListPage() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [songList, setSongList] = useState<TrackType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    total: 0,
    totalPages: 0,
    perPage: "25",
    data: [],
  });

  const dispatch = useAppDispatch();
  const { genreList } = useAppSelector(state => state.music)

  const handlePageChange = (selectedPage: number) => {
    fetchSongs(selectedPage)
  }

  const fetchSongs = useCallback(async (selectedPage = 1) => {
    try {
      setLoading(true);

      const options = {
        currentPage: selectedPage,
        genre: selectedGenre,
        perPage: 25,
      };

      const response = await songService.fetchAll(options);
      const genreList = await genreService.fetchAll();

      dispatch(setGenreList(genreList.data));

      setPagination(response);
      setSongList(response.data);
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedGenre, dispatch]);


  useEffect(() => {
    fetchSongs();

    return () => {
      setSongList([]);
    };
  }, [fetchSongs]);

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="flex flex-col gap-4">

      {errorMessage && <Alert message={errorMessage} />}

      {Array.isArray(genreList) &&
        <div className="flex-1 w-full overflow-hidden">
          <div className="genre-selector flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide pb-4">
            <Button
              onClick={() => setSelectedGenre("All")}
              variant={selectedGenre === "All" ? "default" : "secondary"}
              className="rounded-full shrink-0"
            >
              All
            </Button>

            {genreList.map((genre) => <Button
              key={genre._id}
              onClick={() => setSelectedGenre(genre._id)}
              variant={selectedGenre === genre._id ? "default" : "secondary"}
              className="rounded-full shrink-0"
            >
              {genre.name}
            </Button>)}
          </div>
        </div>
      }

      <div className="songs-list">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {songList.length ?
            songList.map((song, i) => <SongGridCard key={i} song={song} />) :
            <div className="grid-cols-full">
              <NoTracksFound />
            </div>
          }
        </div>

        {pagination.totalPages > 1 &&
          <Pagination
            currentPage={pagination.currentPage}
            totalCount={pagination.totalPages}
            onPageChange={handlePageChange}
          />}
      </div>
    </div>
  )
}
