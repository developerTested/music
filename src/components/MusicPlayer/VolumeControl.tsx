import React from 'react'


type VolumeControlProps = {
    audioElement: React.RefObject<HTMLAudioElement | null>,
    playerState: {
        isEnded: boolean,
        isMuted: boolean,
        repeat: boolean,
        progress: number,
        volume: number,
        hasPrev: boolean,
        hasNext: boolean,
    }
}

export default function VolumeControl({ audioElement, playerState }: VolumeControlProps) {

    const progressBarRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    // Handle click to seek
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioElement.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * audioElement.current.volume;

        audioElement.current.volume = newTime;
    };

    // Handle drag start
    const handleDragStart = () => {
        setIsDragging(true);
        // handleDrag(e);

        // Add global event listeners
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
    };

    // Handle drag movement
    const handleDragMove = (e: MouseEvent) => {
        if (!isDragging || !progressBarRef.current || !audioElement.current) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = percent * audioElement.current.volume;

        audioElement.current.volume = newTime;
    };

    // Handle drag end
    const handleDragEnd = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
    };

    // Calculate progress percentage for thumb position
    const progressPercentage = playerState.volume * 100;

    return (
        <div
            ref={progressBarRef}
            className="relative w-full h-4 group cursor-pointer"
            onClick={handleProgressClick}
        >
            {/* Background Track */}
            <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                {/* Progress Fill */}
                <div
                    className="h-full bg-zinc-800 dark:bg-zinc-300 transition-all duration-100"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Thumb/Knob */}
            <div
                className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2
                            size-4 bg-zinc-800 dark:bg-zinc-300 border-2 border-zinc-800 dark:border-zinc-300 shadow-lg
                            transition-all duration-150
                            rounded-full
                            z-100
                            ${isDragging
                        ? 'scale-125 opacity-100'
                        : 'scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100'
                    }`}
                style={{ left: `${progressPercentage}%` }}
                onMouseDown={handleDragStart}
            />
        </div>
    );
}