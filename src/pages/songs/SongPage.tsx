import { useEffect, useState } from 'react'
import { Skeleton } from '@/components'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { TrackType } from '@/types/artist.type';
import { useParams } from 'react-router-dom';
import songService from '@/service/SongService';
import { Button } from '@/components/forms';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentTrack, setIsPlaying, togglePlaying } from '@/redux/slices/playerSlice';
import { formatDate, formatDuration, formatNumbers } from '@/utilities/helper';
import { LuPlay as Play, LuPause as Pause, LuHeart as Heart, LuList as List, LuMessageSquare as MessageSquare, LuStar as Star } from 'react-icons/lu';

export function SongPage() {
  const [loading, setLoading] = useState(false)
  const [song, setSong] = useState<TrackType | null>(null)
  const [liked, setLiked] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto p-6">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex gap-6 items-start mb-6">
              <div className="relative group">
                <img
                  alt={song.title}
                  src={song.cover}
                  className="w-48 h-48 rounded-2xl shadow-xl ring-1 ring-slate-200 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-indigo-600/80 text-sm mb-2 font-medium tracking-wide">SONG</p>
                <h1 className="text-5xl font-bold mb-3 text-slate-900 leading-tight">{song.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-slate-600">
                  <span className="text-slate-900 font-medium text-lg">{song.artist.name}</span>
                  <span>•</span>
                  <span>{song.album?.title}</span>
                  <span>•</span>
                  <span>{formatDate(song.releaseDate, "Y")}</span>
                  <span>•</span>
                  <span>{formatNumbers(song.plays)} plays</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-slate-200 mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-3 px-1 font-medium transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded ${activeTab === 'about' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                About
                {activeTab === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('lyrics')}
                className={`pb-3 px-1 font-medium transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded ${activeTab === 'lyrics' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                Lyrics
                {activeTab === 'lyrics' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 px-1 font-medium transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded ${activeTab === 'reviews' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                Reviews
                {activeTab === 'reviews' && (
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
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">About This Song</h3>
                  <p className="text-slate-600 leading-relaxed">
                    A mesmerizing journey through ethereal soundscapes and pulsating rhythms.
                    This track showcases the artist's signature blend of ambient textures and
                    driving beats, creating an immersive sonic experience.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm mb-1">Genre</p>
                    <p className="font-semibold text-slate-900">{song.genre?.map((a) => a.name).join(", ",)}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm mb-1">Duration</p>
                    <p className="font-semibold text-slate-900">{formatDuration(song.duration)}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lyrics' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Lyrics</h3>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm text-center py-12">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Lyrics will be displayed here</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">User Reviews</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-500 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
                    Write Review
                  </button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-slate-200 rounded-full" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">User {i}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-slate-500">2 days ago</span>
                      </div>
                      <p className="text-slate-600 text-sm">
                        Amazing track! The production quality is top-notch and the melody is incredibly catchy.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Player Bar - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur border-t border-slate-200 shadow-lg">
        {/* Player Controls - Compact Single Row */}
        <div className="flex items-center justify-between px-6 h-20">
          {/* Left - Song Info with Play Button */}
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            <div className="relative group">
              <img
                src={song.cover}
                alt={song.title}
                className="w-14 h-14 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-5 h-5 text-white" fill="white" />
              </div>
            </div>
            <div className="min-w-0 max-w-xs">
              <p className="font-semibold text-sm truncate text-slate-900">test song</p>
              <p className="text-slate-500 text-xs truncate">Arjit</p>
            </div>
          </div>

          {/* Right - Time and Action Buttons */}
          <div className="flex items-center gap-6">
            <span className="text-slate-700 text-sm font-medium">02:18</span>

            <button
              onClick={handlePlay}
              className="w-11 h-11 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              className="w-11 h-11 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors ring-1 ring-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              aria-label="Queue"
            >
              <List className="w-5 h-5 text-slate-600" />
            </button>

            <button
              onClick={() => setLiked(!liked)}
              className="w-11 h-11 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors ring-1 ring-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              aria-pressed={liked}
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${liked ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                  }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {loading || !song ?
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
        </div> :

        <div className="flex gap-4">
          <LazyLoadImage
            alt={song?.title}
            src={song?.cover}
            className="size-60 rounded-lg"
          />

          <div className="flex-1 flex flex-col gap-2">
            <div className="text-5xl font-bold">
              {song?.title}
            </div>
            <div className="flex items-center gap-4">
              <span>
                {song.artist.name}
              </span>
              {song.album &&
                <span>
                  {song.album.title}
                </span>}
              <span>
                {formatDate(song.releaseDate, "Y")}
              </span>
              <span>
                {formatDuration(song.duration)}
              </span>
              <span>
                {formatNumbers(song.plays)}
              </span>
            </div>
            <div className="actions mt-auto flex items-center gap-4">
              <Button
                variant="icon"
                size="icon"
                onClick={() => handlePlay(song)}
                className="size-14"
              >
                {currentTrack?.title === song.title && isPlaying ?
                  <MdPause className="size-6" /> :
                  <MdPlayArrow className="size-6" />}
              </Button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
