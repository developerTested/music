import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/forms'
import genreService from '@/service/GenreService';
import albumService from '@/service/AlbumService';
import type { AlbumType, PaginationType } from '@/types/artist.type';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setGenreList } from '@/redux/slices/musicSlice';
import { AxiosError } from 'axios';
import Pagination from '@/components/Pagination';
import NoTracksFound from '@/components/NoTracksFound';
import AlbumGridCard from '@/components/cards/AlbumGridCard';
import Alert from '@/components/Alert';

export function AlbumListPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [albumList, setAlbumList] = useState<AlbumType[]>([])

  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    total: 0,
    totalPages: 0,
    perPage: "25",
    data: [],
  });

  const dispatch = useAppDispatch()
  const { genreList } = useAppSelector(state => state.music)

  const handlePageChange = (selectedPage: number) => {
    fetchAlbums(selectedPage)
  }


  const fetchAlbums = useCallback(async (selectedPage = 1) => {
    try {
      setLoading(true);

      const options = {
        currentPage: selectedPage,
        genre: selectedGenre,
        perPage: 25,
      };

      const response = await albumService.fetchAll(options);

      setPagination(response);
      setAlbumList(response.data);
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedGenre]);


  useEffect(() => {

    const fetchGenres = async () => {
      try {
        const genreList = await genreService.fetchAll();
        dispatch(setGenreList(genreList.data));
      } catch (error) {
        console.log("Error", error);

      }
    }

    fetchAlbums()
    fetchGenres()

  }, [fetchAlbums, dispatch]);



  

  return (
    <div>

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
          {Array.isArray(albumList) ?
            albumList.map((album, i) => <AlbumGridCard key={i} album={album} />) :
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
