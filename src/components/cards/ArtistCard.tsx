import { Link } from 'react-router-dom'
import type { ArtistType } from '@/types/artist.type'
import { formatNumbers } from '@/utilities/helper'

type ArtistCardProps = {
  artist: ArtistType,
}

export default function ArtistCard({ artist }: ArtistCardProps) {

  return (
    <Link
      key={artist._id}
      to={`/artist/${artist._id}`}

      className="p-4 rounded-lg transition-all duration-200 group cursor-pointer"
    >
      <div className="relative mb-4">
        <img
          src={artist.avatar}
          alt={artist.name}
          className="aspect-square size-full mx-auto rounded-full object-top object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <h3 className="font-semibold truncate mb-1">{artist.name}</h3>

      {artist?.followers && <p className="text-sm text-zinc-600 dark:text-zinc-400">{formatNumbers(artist.followers)} followers</p>}
    </Link>

  )

}
