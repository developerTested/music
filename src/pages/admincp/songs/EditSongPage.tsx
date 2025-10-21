import type { TrackType } from '@/types/artist.type'
import React, { useEffect, useState } from 'react'
import { SongForm } from './SongForm'
import { useParams } from 'react-router-dom'
import songService from '@/service/SongService'

export function EditSongPage() {

    const [song, setSong] = useState<TrackType | null>(null)

    const { songId } = useParams()

    useEffect(() => {

        if (!songId) {
            return;
        }

        const fetchSong = async () => {
            try {
                const response = await songService.getSongById(songId);

                setSong(response);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSong()

        return () => {
            setSong(null);
        }
    }, [songId])

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Update Song: ${song?.title}
                </h2>
            </div>

            {song ? <SongForm song={song} /> : <div className="">Loading...</div>}
        </div>
    )
}
