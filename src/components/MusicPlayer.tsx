import React from 'react'
import { MdClose, MdPause, MdPlayArrow, MdShuffle, MdSkipNext, MdSkipPrevious, MdVolumeMute, MdVolumeOff, MdVolumeUp } from "react-icons/md"
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { Button } from './forms';
import { formatDuration } from '@/utilities/helper';
import { useAppDispatch, useAppSelector, usePlayer } from '@/hooks';
import { setCurrentTrack } from '@/redux/slices/playerSlice';

export function MusicPlayer() {

    const progressRef = React.useRef<HTMLDivElement>(null)
    const progressBarRef = React.useRef<HTMLInputElement>(null)
    const { currentTrack, isPlaying, disableNext, disablePrev } = useAppSelector(state => state.player);
    const dispatch = useAppDispatch()

    const {
        audioElement,
        handleOnTimeUpdate,
        playerState,
        togglePlay,
        toggleMute,
        toggleRepeat,
        navigateSong
    } = usePlayer();

    /**
     * Set Progress bar
     */

    if (currentTrack) {
        const progress = playerState.progress.toFixed(2);

        if (progressRef.current) {
            progressRef.current.style.setProperty("width", progress + '%');
        }

        if (progressBarRef.current) {
            progressBarRef.current.value = progress;
        }
    }

    const clearPlayerData = () => {
        dispatch(setCurrentTrack(null))
    }

    return (
        <div className={`transition-all ${currentTrack ? "translate-y-0" : "translate-y-20"} fixed left-0 right-0 bottom-0 z-1030 block disabled:cursor-not-allowed`}>

            <div ref={progressBarRef} className="progress-bar w-full h-1 hover:h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
                <div ref={progressRef} className={`progress size-full bg-zinc-800 dark:bg-zinc-400 w-0 transition-all duration-100`}></div>
            </div>
            <div className="flex items-center p-2">
                <div className="w-350 absolute bottom-full mb-2 md:relative md:mb-0 track-info flex items-center gap-4">
                    {currentTrack ? <React.Fragment>
                        <div className={`relative flex items-center justify-center ${isPlaying ? "rounded-full" : "rounded-lg"} cover w-14 h-14 shrink-0`}>
                            {isPlaying ? <div className="size-2 absolute inset-auto bg-white border-2 z-10 rounded-full"></div> : ""}

                            <img src={currentTrack.album?.cover || currentTrack.cover} className={`size-full block ${isPlaying ? "animate-spin rounded-full" : "rounded-lg"}`} />
                        </div>
                        <div className="hidden lg:block max-w-md overflow-hidden">
                            <h3 className="title text-lg font-semibold truncate">
                                {currentTrack.title}
                            </h3>
                            <h4 className="truncate">
                                {currentTrack.artist?.name}
                            </h4>
                        </div>
                    </React.Fragment> : ""}
                </div>
                <div className="controls text-4xl m-auto flex items-center gap-4">

                    <Button disabled={disablePrev} onClick={() => navigateSong("PREV")} variant="icon" size="icon">
                        <MdSkipPrevious />
                    </Button>

                    <Button disabled={!currentTrack} onClick={togglePlay} variant="icon" size="icon">
                        {isPlaying && !playerState.isEnded ? <MdPause /> : <MdPlayArrow />}
                    </Button>

                    <Button disabled={disableNext} onClick={() => navigateSong("NEXT")} variant="icon" size="icon">
                        <MdSkipNext />
                    </Button>
                </div>
                <div className="text-4xl flex items-center gap-4">
                    <div className="flex items-center">
                        <div className="media-time-info text-base">
                            {formatDuration(audioElement.current?.currentTime)} / {formatDuration(audioElement.current?.duration)}
                        </div>
                    </div>
                    <Button disabled={!currentTrack} onClick={toggleMute} variant="icon" size="icon">
                        {(playerState.volume > 5) && !playerState.isMuted ? <MdVolumeMute /> : playerState.isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                    </Button>
                    <Button disabled={!currentTrack} onClick={toggleRepeat} variant="icon" size="icon">
                        {playerState.repeat ? <TbRepeat /> : <TbRepeatOff />}
                    </Button>
                    <Button disabled={!currentTrack} onClick={togglePlay} variant="icon" size="icon">
                        <MdShuffle />
                    </Button>


                    <Button onClick={clearPlayerData} variant="icon" size="icon">
                        <MdClose />
                    </Button>
                </div>

                {currentTrack?.title && <audio
                    key={currentTrack._id}
                    ref={audioElement}
                    onTimeUpdate={handleOnTimeUpdate}
                    loop={playerState.repeat}
                    muted={playerState.isMuted}
                    src={currentTrack.fileUrl}
                // src={currentTrack.youtubeVideoId ? `${import.meta.env.VITE_BACKEND_URL}/stream/audio?url=https://www.youtube.com/watch?v=${currentTrack.youtubeVideoId}` : currentTrack.fileUrl}
                />
                }
            </div>
        </div>
    )
}
