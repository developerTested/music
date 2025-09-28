import { GiMusicalNotes } from 'react-icons/gi';

export default function NoTracksFound() {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <GiMusicalNotes className="text-6xl mb-6 animate-pulse" />
            <h2 className="text-2xl font-semibold">Silence fills the stage</h2>
            <p className="mt-2  max-w-md">
                No tracks matched your search.
                Adjust your filters and let the rhythm find you.
            </p>
        </div>
    );
}
