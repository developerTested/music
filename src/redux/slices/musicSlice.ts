import type { GenreType } from "@/types/artist.type";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    genreList: GenreType[],

}

const initialState: initialStateType = {
    genreList: [],
}

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setGenreList: (state, action) => {
            state.genreList = action.payload;
        }
    }
})

export const { setGenreList } = musicSlice.actions
export default musicSlice.reducer