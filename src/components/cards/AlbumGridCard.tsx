import type { AlbumType } from "@/types/artist.type"
import { FaImage } from "react-icons/fa"
import { Link } from "react-router-dom"

type SongGridCardProps = {
  album?: AlbumType,
}

export default function AlbumGridCard({ album }: SongGridCardProps) {

  if (!album) {
    return (
      <div className="relative animate-pulse">
        <div className="size-60 bg-slate-100 rounded-md flex items-center justify-center">
          <FaImage className="size-8" />
        </div>

        <div className="w-full h-8 bg-slate-100">
        </div>
      </div>
    )
  }


  return (
    <div className="relative flex flex-col gap-2 bg-white">
      <Link
        to={`/album/${album._id}`}
        className="size-full  xl:size-60 rounded-lg">
        <img
          className="size-full rounded-lg"
          src={album.cover}
        />
      </Link>

      <div className="block">
        <div className="text-2xl font-bold truncate">
          {album.title}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            Total {album.totalTracks} tracks
          </div>
        </div>
      </div>
    </div>
  )
}
