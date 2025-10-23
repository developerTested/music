import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    darkMode: boolean,
    mobileMenu: boolean,
    miniMenu: boolean,
    showLoginForm: boolean,
}

const initialState: initialStateType = {
    darkMode: false,
    mobileMenu: false,
    miniMenu: false,
    showLoginForm: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },

        setMobileMenu: (state) => {
            state.mobileMenu = !state.mobileMenu;
        },

        setMiniMenu: (state, action) => {
            state.miniMenu = action.payload;
        },

        setShowLoginForm: (state, action) => {
            state.showLoginForm = action.payload;
        },
    }
})

export const { setDarkMode, setMiniMenu, setMobileMenu, setShowLoginForm } = appSlice.actions
export default appSlice.reducer