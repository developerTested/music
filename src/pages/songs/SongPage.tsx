import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { TrackType } from '@/types/artist.type';
import { useParams } from 'react-router-dom';
import songService from '@/service/SongService';
import { Button } from '@/components/forms';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentTrack, setIsPlaying, togglePlaying } from '@/redux/slices/playerSlice';
import { formatDate, formatDuration, formatNumbers } from '@/utilities/helper';
import { FaCalendar } from 'react-icons/fa';
import Skeleton from '@/components/Skeleton';

export default function SongPage() {
  const [loading, setLoading] = useState(false)
  const [song, setSong] = useState<TrackType | null>(null)
  const [activeTab, setActiveTab] = useState('about');

  const { songId } = useParams();

  const { currentTrack, isPlaying } = useAppSelector(state => state.player)

  const dispatch = useAppDispatch();

  const handlePlay = (track: TrackType) => {

    if (currentTrack?._id === track._id) {
      dispatch(togglePlaying());
    } else {
      dispatch(setCurrentTrack(track))
      dispatch(setIsPlaying(true));
    }
  };


  useEffect(() => {
    if (!songId) {
      return;
    }

    const fetchSongDetails = async () => {
      setLoading(true)
      try {
        const response = await songService.getSongById(songId);
        setSong(response)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSongDetails()

    return () => {
      setSong(null)
    }
  }, [songId])

  if (loading || !song) {
    return (
      <div className="flex gap-4">
        <Skeleton className="size-60 rounded-lg" />

        <div className="flex-1 grid gap-2">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />

          <div className="flex items-center gap-4 mt-auto">
            <Skeleton className="size-14 rounded-full" />
            <Skeleton className="size-14 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto p-6">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex gap-6 items-start mb-6">
              <div className="relative group">
                <LazyLoadImage
                  alt={song.title}
                  src={song.cover}
                  className="w-48 h-48 rounded-2xl shadow-xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm mb-2 font-medium tracking-wide">SONG</p>
                <h1 className="text-5xl font-bold mb-3 leading-tight">{song.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  {song.artist &&
                    <span className="font-medium text-lg">
                      {song.artist.name}
                    </span>
                  }
                  {song.album && <>
                    <span>•</span>
                    <span>{song.album?.title}</span>
                  </>}
                  <span>•</span>
                  <span className='flex items-center gap-2'>
                    <FaCalendar />
                    {formatDate(song.releaseDate, "Y")}
                  </span>
                  {song.plays && <>
                    <span>•</span>
                    <span>{formatNumbers(song.plays)} plays</span>
                  </>}
                </div>
                <Button
                  variant="icon"
                  size="icon"
                  onClick={() => handlePlay(song)}
                  className="size-14 flex items-center justify-center"
                >
                  {currentTrack?.title === song.title && isPlaying ?
                    <MdPause className="size-6" /> :
                    <MdPlayArrow className="size-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-slate-200 dark:border-zinc-800 mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-3 px-1 font-medium transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded ${activeTab === 'about' ? 'font-bold' : 'text-zinc-600 dark:text-zinc-400'
                  }`}
              >
                About
                {activeTab === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('lyrics')}
                className={`pb-3 px-1 font-medium transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded ${activeTab === 'lyrics' ? 'font-bold' : 'text-zinc-600 dark:text-zinc-400'
                  }`}
              >
                Lyrics
                {activeTab === 'lyrics' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-zinc-200">About This Song</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    A mesmerizing journey through ethereal soundscapes and pulsating rhythms.
                    This track showcases the artist's signature blend of ambient textures and
                    driving beats, creating an immersive sonic experience.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-slate-200 dark:border-zinc-900 shadow-sm">
                    <p className="text-slate-500 dark:text-zinc-200 text-sm mb-1">Genre</p>
                    <p className="font-semibold text-slate-900 dark:text-zinc-200">{song.genre?.map((a) => a.name).join(", ",)}</p>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-slate-500 dark:text-zinc-200 text-sm mb-1">Duration</p>
                    <p className="font-semibold text-slate-900 dark:text-zinc-200">{formatDuration(song.duration)}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lyrics' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-zinc-200">Lyrics</h3>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}