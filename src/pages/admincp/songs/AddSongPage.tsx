import { SongForm } from './SongForm'

export function AddSongPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Create a new Song
                </h2>
            </div>
            
            <SongForm />
        </div>
    )
}
