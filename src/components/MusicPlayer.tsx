import React from 'react';
import {
    MdClose,
    MdPause,
    MdPlayArrow,
    MdShuffle,
    MdSkipNext,
    MdSkipPrevious,
    MdVolumeMute,
    MdVolumeOff,
    MdVolumeUp
} from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { Button } from './forms';
import { formatDuration } from '@/utilities/helper';
import { useAppDispatch, useAppSelector, usePlayer } from '@/hooks';
import { setCurrentTrack } from '@/redux/slices/playerSlice';
import { PlayerProgressBar } from './MusicPlayer/PlayerProgressBar';
import TrackInfo from './MusicPlayer/TrackInfo';
import Tooltip from './Tooltip';
import VolumeControl from './MusicPlayer/VolumeControl';

export default function MusicPlayer() {
    const progressRef = React.useRef<HTMLDivElement>(null);
    const progressBarRef = React.useRef<HTMLInputElement>(null);

    const { currentTrack, isPlaying, disableNext, disablePrev } = useAppSelector(
        state => state.player
    );
    const dispatch = useAppDispatch();

    const {
        audioElement,
        handleOnTimeUpdate,
        playerState,
        togglePlay,
        toggleMute,
        toggleRepeat,
        navigateSong,
    } = usePlayer();

    // Memoize progress calculation
    const progress = React.useMemo(() =>
        currentTrack ? playerState.progress.toFixed(2) : '0',
        [currentTrack, playerState.progress]
    );

    // Update progress bar using useEffect to avoid side effects in render
    React.useEffect(() => {
        if (!currentTrack) return;

        if (progressRef.current) {
            progressRef.current.style.setProperty("width", `${progress}%`);
        }

        if (progressBarRef.current) {
            progressBarRef.current.value = progress;
        }
    }, [progress, currentTrack]);

    const clearPlayerData = React.useCallback(() => {
        dispatch(setCurrentTrack(null));
    }, [dispatch]);

    const handleNavigateSong = React.useCallback((direction: "PREV" | "NEXT") => {
        navigateSong(direction);
    }, [navigateSong]);

    // Memoize volume icon to prevent unnecessary re-renders
    const volumeIcon = React.useMemo(() => {
        if (!currentTrack) return <MdVolumeUp />;

        if (playerState.isMuted) {
            return <MdVolumeOff />;
        }

        return playerState.volume > 5 ? <MdVolumeMute /> : <MdVolumeUp />;
    }, [playerState.volume, playerState.isMuted, currentTrack]);

    const playPauseIcon = React.useMemo(() =>
        isPlaying && !playerState.isEnded ? <MdPause /> : <MdPlayArrow />,
        [isPlaying, playerState.isEnded]
    );

    const repeatIcon = React.useMemo(() =>
        playerState.repeat ? <TbRepeat /> : <TbRepeatOff />,
        [playerState.repeat]
    );

    // Format duration safely
    const formattedDuration = React.useMemo(() => {
        const currentTime = audioElement.current?.currentTime || 0;
        const duration = audioElement.current?.duration || 0;
        return `${formatDuration(currentTime)} / ${formatDuration(duration)}`;
    }, [audioElement, playerState.progress]);

    const isPlayerVisible = Boolean(currentTrack);
    const hasCurrentTrack = Boolean(currentTrack);

    if (!isPlayerVisible) {
        return null;
    }

    return (
        <div
            className="fixed left-0 right-0 bottom-0 z-1030 transition-transform duration-300 ease-in-out"
            data-testid="music-player"
        >

            <PlayerProgressBar
                playerState={playerState}
                audioElement={audioElement}
            />

            <div className="flex items-center p-2 bg-background/95 backdrop-blur-sm">
                <TrackInfo
                    isPlaying={isPlaying}
                    currentTrack={currentTrack}
                />

                {/* Main Controls */}
                <div className="controls text-4xl m-auto flex items-center gap-2 md:gap-4">
                    <Tooltip title="Shuffle">
                        <Button
                            disabled={!hasCurrentTrack}
                            onClick={togglePlay}
                            variant="icon"
                            size="icon"
                            aria-label="Shuffle"
                        >
                            <MdShuffle />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Previous track">
                        <Button
                            disabled={disablePrev}
                            onClick={() => handleNavigateSong("PREV")}
                            variant="icon"
                            size="icon"
                            aria-label="Previous track"
                        >
                            <MdSkipPrevious />
                        </Button>
                    </Tooltip>
                    <Tooltip title={isPlaying ? "Pause" : "Play"}>
                        <Button
                            disabled={!hasCurrentTrack}
                            onClick={togglePlay}
                            variant="icon"
                            size="icon"
                            aria-label={isPlaying ? "Pause" : "Play"}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            {playPauseIcon}
                        </Button>
                    </Tooltip>
                    <Tooltip title="Next track">
                        <Button
                            disabled={disableNext}
                            onClick={() => handleNavigateSong("NEXT")}
                            variant="icon"
                            size="icon"
                            aria-label="Next track"
                        >
                            <MdSkipNext />
                        </Button>
                    </Tooltip>
                    <Tooltip title={playerState.repeat ? "Disable repeat" : "Enable repeat"}>
                        <Button
                            disabled={!hasCurrentTrack}
                            onClick={toggleRepeat}
                            variant="icon"
                            size="icon"
                            aria-label={playerState.repeat ? "Disable repeat" : "Enable repeat"}
                        >
                            {repeatIcon}
                        </Button>
                    </Tooltip>
                </div>

                {/* Volume and Close Controls */}
                <div className="text-4xl flex items-center gap-2 md:gap-4">
                    <div className="flex items-center">
                        <div
                            className="media-time-info text-sm md:text-base text-muted-foreground"
                            aria-live="polite"
                        >
                            {formattedDuration}
                        </div>
                    </div>

                    <div className="volume-control flex items-center gap-2">

                        <VolumeControl
                            playerState={playerState}
                            audioElement={audioElement}
                        />

                        <Tooltip title="Volume">
                            <Button
                                disabled={!hasCurrentTrack}
                                onClick={toggleMute}
                                variant="icon"
                                size="icon"
                                aria-label={playerState.isMuted ? "Unmute" : "Mute"}
                            >
                                {volumeIcon}
                            </Button>
                        </Tooltip>

                    </div>

                    <Button
                        onClick={clearPlayerData}
                        variant="icon"
                        size="icon"
                        aria-label="Close player"
                    >
                        <MdClose />
                    </Button>
                </div>

                {/* Audio Element */}
                {currentTrack?.title && (
                    <audio
                        key={currentTrack._id}
                        ref={audioElement}
                        onTimeUpdate={handleOnTimeUpdate}
                        onEnded={() => !playerState.repeat && handleNavigateSong("NEXT")}
                        loop={playerState.repeat}
                        muted={playerState.isMuted}
                        src={currentTrack.fileUrl}
                        preload="metadata"
                    // src={currentTrack.youtubeVideoId ? 
                    //   `${import.meta.env.VITE_BACKEND_URL}/stream/audio?url=https://www.youtube.com/watch?v=${currentTrack.youtubeVideoId}` 
                    //   : currentTrack.fileUrl}
                    />
                )}
            </div>
        </div>
    );
}