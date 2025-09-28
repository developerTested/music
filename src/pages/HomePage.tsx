import SongGridCard from "@/components/cards/SongGridCard";
import songService from "@/service/SongService";
import type { TrackType } from "@/types/artist.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function HomePage() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [songList, setSongList] = useState<TrackType[]>([])

  useEffect(() => {

    const fetchSongs = async () => {
      try {
        const response = await songService.fetchAll();

        setSongList(response.data)

      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error?.message);
        } else if (error instanceof Error) {
          setErrorMessage(error?.message);
        } else {
          setErrorMessage("Something went wrong")
        }
      }
    }

    fetchSongs();

    return () => {
      setSongList([])
      setErrorMessage(null);
    }
  }, [])


  return (
    <div>
      <div className="text-lg font-semibold mb-4">
        Latest Songs
      </div>

      <Hero />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        
        <h2 className="text-xl font-semibold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* <!-- Playlist cards --> */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src="playlist.jpg" className="rounded mb-2" />
            <p className="font-medium">Chill Vibes</p>
          </div>
          {/* <!-- Repeat for more cards --> */}
        </div>
      </div>


      {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {songList.length ? songList.map((song, i) => <SongGridCard key={i} song={song} />) : ""}
      </div> */}
    </div>
  )
}


// Hero.jsx
 function Hero() {
  return (
    <div className="text-center py-10 px-6">
      <h2 className="text-4xl font-extrabold mb-2">Feel the Future of Sound</h2>
      <p className="text-gray-400 mb-6">Stream. Discover. Vibe.</p>
      <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
        Explore Tracks
      </button>
    </div>
  );
}
