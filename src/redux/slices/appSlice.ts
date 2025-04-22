import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    darkMode: boolean,

}

const initialState: initialStateType = {
    darkMode: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        }
    }
})

export const { setDarkMode } = appSlice.actions
export default appSlice.reducer