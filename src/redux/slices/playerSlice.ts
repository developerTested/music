import { createSlice } from "@reduxjs/toolkit";
import { TrackType } from "../../types";

type initialStateType = {
    currentTrack: TrackType | null,
    queue: TrackType[],
    isPlaying: boolean,
    isEnded: boolean,
    disableNext: boolean,
    disablePrev: boolean,
}

const initialState: initialStateType = {
    currentTrack: null,
    queue: [],
    isEnded: false,
    isPlaying: false,
    disableNext: false,
    disablePrev: false,
}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {

        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
        },

        setQueue: (state, action) => {
            state.queue = action.payload;
        },

        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },

        setIsEnded: (state, action) => {
            state.isEnded = action.payload;
        },

        setQueueNext: (state, action) => {
            state.disableNext = action.payload;
        },

        setQueuePrev: (state, action) => {
            state.disablePrev = action.payload;
        },

        togglePlaying: (state) => {
            state.isPlaying = !state.isPlaying
        }
    }
})


export const { setCurrentTrack, setIsEnded, setIsPlaying, setQueue, setQueueNext, setQueuePrev, togglePlaying } = playerSlice.actions
export default playerSlice.reducer