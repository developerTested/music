import { GiMusicalNotes } from 'react-icons/gi';

type NoTracksFoundProps = {
    title?: string,
    message?: string,
}

export default function NoTracksFound({ title = "Silence fills the stage", message = "No tracks matched your search.\n Adjust your filters and let the rhythm find you." }: NoTracksFoundProps) {
    return (

        <div
            className="flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center"
        >
            <GiMusicalNotes className="text-6xl mb-6 animate-pulse" aria-hidden="true" />
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-2 max-w-md whitespace-pre-line">
                {message}
            </p>

        </div>
    );
}
