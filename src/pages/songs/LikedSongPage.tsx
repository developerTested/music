import { SongItemCard } from '@/components/cards';
import SongGridCard from '@/components/cards/SongGridCard';
import { Button } from '@/components/forms';
import Tooltip from '@/components/Tooltip';
import type { TrackType } from '@/types/artist.type';
import React, { useState } from 'react'
import { FaList, FaThLarge } from 'react-icons/fa';

export function LikedSongPage() {
    const [layout, setLayout] = useState("grid");
    const [tracks, setTracks] = useState<TrackType[]>([]);

    return (
        <div className="">
            <section className="mb-8 flex items-center justify-between">

                <h2 className="text-2xl font-bold">Liked Songs</h2>

                <Tooltip
                    title={layout === "grid" ? "Show List" : "Show Grid"}
                    position="center-left"
                >
                    <Button onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}>
                        {layout === 'grid' ? <FaList /> : <FaThLarge />}
                    </Button>
                </Tooltip>
            </section>
            <div className={layout === 'grid' ? 'grid-container' : 'list-container'}>
                {tracks.map(track =>
                    layout === 'grid' ? (
                        <SongGridCard key={track._id} song={track} />
                    ) : (
                        <SongItemCard key={track._id} song={track} />
                    )
                )}
            </div>
        </div>
    )
}
