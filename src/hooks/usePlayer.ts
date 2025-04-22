import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { setCurrentTrack, setIsPlaying, setQueueNext, setQueuePrev, togglePlaying } from "../redux/slices/playerSlice";
import { TrackType } from "@/types";

export function usePlayer() {
    const audioElement = useRef<HTMLAudioElement>(null)

    const dispatch = useAppDispatch();
    const { isPlaying, currentTrack, queue } = useAppSelector(state => state.player)

    const [playerState, setPlayerState] = useState({
        isEnded: false,
        isMuted: false,
        repeat: false,
        progress: 0,
        volume: 1,
        hasPrev: false,
        hasNext: false,
    });

    /**
     * Toggle Play/Pause
     */
    const togglePlay = () => {
        if (!audioElement.current) {
            return;
        }

        setPlayerState(prev => ({
            ...prev,
            progress: 0,
        }));

        dispatch(togglePlaying())
    };


    /**
     * Toggles the mute state of the player.
     * 
     * This function flips the current mute state (`isMuted`) in the player state.
     * When called, it changes `isMuted` to its opposite value (if it was true, it becomes false, and vice versa).
     * 
     * @returns {void}
     */
    const toggleMute = () => {
        setPlayerState(prev => ({
            ...prev,
            isMuted: !prev.isMuted,
        }));
    };

    /**
     * Toggles the repeat state of the player.
     * 
     * This function flips the current repeat state (`repeat`) in the player state.
     * When called, it changes `repeat` to its opposite value (if it was true, it becomes false, and vice versa).
     * 
     * @returns {void}
     */
    const toggleRepeat = () => {
        setPlayerState(prev => ({
            ...prev,
            repeat: !prev.repeat,
        }));
    }

    /**
     * Handles the time update event for the audio element.
     * 
     * Calculates the current progress of the audio (in percentage) based on its current time and total duration.
     * Updates the state with the calculated progress and a flag indicating whether the audio has ended.
     * 
     * The state update ensures that the progress bar is updated, and the 'isEnded' flag is set to true when the audio has finished playing.
     */
    const handleOnTimeUpdate = () => {
        const currentTime = audioElement.current?.currentTime;
        const duration = audioElement.current?.duration;

        if (!duration || !currentTime) {
            return 0;
        }

        if (duration > 0) {
            const progress = (currentTime / duration) * 100;
            const isEnded = currentTime === duration;

            setPlayerState(prev => ({
                ...prev,
                progress,
                isEnded,
            }));

            if (isEnded) {
                setPlayerState(prev => ({
                    ...prev,
                    isPlaying: false,
                }));
                
                dispatch(setIsPlaying(false))

                if (currentTrack && queue.length) {
                    const currentIndex = queue.findIndex((a: TrackType) => a.id === currentTrack.id);
                    
                    if (currentIndex === -1) {
                        return;
                    }
                    
                    if (queue && queue[currentIndex + 1]) {
                        dispatch(setCurrentTrack(queue[currentIndex + 1]))
                        dispatch(togglePlaying())
                    }
                }

            }
        }
    }

    /**
     * Handles the progress bar interaction, updating the audio playback position.
     * 
     * This function is called when the user manually adjusts the progress bar. It:
     * - Converts the progress bar value (in percentage) into the corresponding time in the audio.
     * - Sets the audio's current time to the calculated value based on the manual change.
     * - Plays or pauses the audio based on the current `isPlaying` state.
     * - Updates the state with the new progress value.
     * 
     * @param {Event} event - The event triggered by the progress bar change, containing the new value.
     */
    const handleProgress = (event: any) => {
        const manualChange = Math.min(Math.max(Number(event.target.value), 0), 100);

        const audio = audioElement.current || null;

        if (audio && audio.duration > 0) {
            audio.currentTime = (audio.duration / 100) * manualChange;

            if (isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }

            setPlayerState(prev => ({
                ...prev,
                progress: manualChange,
            }));
        }
    };


    const navigateSong = (nav_type: "NEXT" | "PREV" | "" = "") => {


        if (!nav_type.trim()) {
            return;
        }

        if (!currentTrack) {
            return;
        }

        const currentIndex = queue.findIndex((a: TrackType) => a.id === currentTrack.id);

        if (currentIndex === -1) {
            return;
        }

        if (nav_type === "NEXT" && queue[currentIndex + 1]) {
            setPlayerState((prev) => ({ ...prev, hasNext: true }))
            dispatch(setCurrentTrack(queue[currentIndex + 1]));
        }

        if (nav_type === "PREV" && queue[currentIndex - 1]) {
            setPlayerState((prev) => ({ ...prev, hasPrev: true }))
            dispatch(setCurrentTrack(queue[currentIndex - 1]));
        }


    }


    /**
     * Effects
     */

    useEffect(() => {
        if (currentTrack && audioElement.current) {

            setPlayerState((prev) => ({ ...prev, progress: 0 }))

            const audio = audioElement.current;
            audio.src = currentTrack.preview;
            audio.load();
            audio.play()
        }

        return () => {
            audioElement.current?.pause();
        };
    }, [currentTrack, audioElement]);

    useEffect(() => {
        if (!audioElement.current) {
            return;
        }

        if (isPlaying) {
            audioElement.current.play();
        } else {
            audioElement.current.pause()
        }

        return () => {
            audioElement.current?.pause();
        };
    }, [isPlaying, audioElement.current]);


    useEffect(() => {
        if (currentTrack && queue.length > 0) {
            const currentIndex = queue.findIndex((a) => a.id === currentTrack.id);

            dispatch(setQueueNext(currentIndex === queue.length - 1))
            dispatch(setQueuePrev(currentIndex === 0))
        }
    }, [currentTrack, queue]);



    return {
        audioElement,
        navigateSong,
        handleOnTimeUpdate,
        handleProgress,
        toggleMute,
        togglePlay,
        toggleRepeat,
        playerState,
        setPlayerState,
    }
}