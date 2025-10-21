import type { PlayListType } from "@/types/artist.type"
import { Button } from "../forms"
import { MdPlayArrow } from "react-icons/md"

type PlayListCardProps = {
    playlist: PlayListType,
}

export function PlayListCard({ playlist }: PlayListCardProps) {

    return (
        <div
            className="p-4 rounded-lg transition-all duration-200 group cursor-pointer"
        >
            <div className="relative mb-2">
                <img
                    src={playlist.cover}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover rounded-lg"
                />
                <Button
                    variant="icon"
                    size="icon"
                    className="absolute bottom-2 right-2  opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                >
                    <MdPlayArrow className="size-6" />
                </Button>
            </div>
            <h3 className="font-semibold truncate mb-1">{playlist.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{playlist.description}</p>
        </div>
    )
}
