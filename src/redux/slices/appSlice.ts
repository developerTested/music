import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    darkMode: boolean,
    mobileMenu: boolean,
    miniMenu: boolean,
}

const initialState: initialStateType = {
    darkMode: false,
    mobileMenu: false,
    miniMenu: true,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },

        setMobileMenu: (state, action) => {
            state.mobileMenu = action.payload;
        },

        setMiniMenu: (state, action) => {
            state.miniMenu = action.payload;
        },
    }
})

export const { setDarkMode, setMiniMenu, setMobileMenu } = appSlice.actions
export default appSlice.reducer