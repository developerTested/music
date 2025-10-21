import { Greeting } from "@/components";
import { PlayListCard, SongItemCard } from "@/components/cards";
import AlbumGridCard from "@/components/cards/AlbumGridCard";
import ArtistCard from "@/components/cards/ArtistCard";
import SongGridCard from "@/components/cards/SongGridCard";
import { Button } from "@/components/forms";
import type { AlbumType, ArtistType, PlayListType, TrackType } from "@/types/artist.type";
import { MUSIC_API } from "@/utilities/api";
import { useQuery } from "@tanstack/react-query";

type MusicDashboardProps = {
  data: {
    topSongs: TrackType[],
    recentUploads: TrackType[],
    recentReleases: TrackType[],
    recentAlbums: AlbumType[],
    mostPlayedSongs: TrackType[],
    featuredArtists: ArtistType[],
    recentPlayedSongs: TrackType[],
  }
}
const MusicDashboard = ({ data }: MusicDashboardProps) => {
  const {
    topSongs = [],
    recentUploads = [],
    recentReleases = [],
    recentAlbums = [],
    mostPlayedSongs = [],
    featuredArtists = [],
    recentPlayedSongs = []
  } = data;

  return (
    <div>
      {recentReleases.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recently Played</h2>
            <Button
              size="sm"
              className="text-sm font-medium"
            >
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {recentReleases.map((playlist, i) => <PlayListCard key={i} playlist={playlist} />)}
          </div>
        </section>
      )}

      {topSongs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Top Songs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {topSongs.map((song, i) => <SongGridCard key={i} song={song} />)}
          </div>
        </section>
      )}

      {recentUploads.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Recent Uploads</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {recentUploads.map((song, i) => <SongGridCard key={i} song={song} />)}
          </div>
        </section>
      )}

      {recentAlbums.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Albums</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {recentAlbums.map((album, i) => <AlbumGridCard key={i} album={album} />)}
          </div>
        </section>
      )}

      {featuredArtists.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">

            <div className="flex-1 w-full text-xl font-bold">
              Popular Artists
            </div>

            <button className="text-gray-400 hover:text-white text-sm font-medium">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredArtists.map((artist, i) => <ArtistCard key={i} artist={artist} />)}
          </div>
        </section>
      )}

      {/* Recently Played Tracks */}
      {recentPlayedSongs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recently Played Tracks</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="bg-lightDark rounded-lg overflow-hidden">
            {recentPlayedSongs.slice(0, 5).map((song, index) => <SongItemCard key={index} song={song} />)}
          </div>
        </section>
      )}
    </div>
  );
};



export function HomePage() {

  const { isPending, error, data } = useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const { data: response } = await MUSIC_API.get('/home')

      return response.data;
    }
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  return (
    <div className="space-y-8 overflow-y-auto">
      {/* Welcome Header */}
      < section className="mb-8">
        <Greeting />
        <p className="text-zinc-600 dark:text-zinc-400">Ready to discover some great music?</p>
      </section>

      <MusicDashboard data={data} />

      {/* Recently Played */}
      {/* <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recently Played</h2>
          <Button
            size="sm"
            className="text-sm font-medium"
          >
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {recentlyPlayed.map((playlist, i) => <PlayListCard key={i} playlist={playlist} />)}
        </div>
      </section> */}

      {/* Made For You */}
      {/* <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Made for You</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredPlaylists.map((playlist, i) => <PlayListCard key={i} playlist={playlist} />)}
        </div>
      </section> */}

      {/* Popular Artists */}
      {/* <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Popular Artists</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {artists.map((artist, i) => <ArtistCard key={i} artist={artist} />)}
        </div>
      </section> */}

      {/* Recently Played Tracks */}
      {/* <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recently Played Tracks</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        <div className="bg-lightDark rounded-lg overflow-hidden">
          {songs.slice(0, 5).map((song, index) => <SongItemCard key={index} song={song} />)}
        </div>
      </section> */}
    </div >
  );
};