import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    darkMode: boolean,

}

const initialState: initialStateType = {
    darkMode: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.darkMode = action.payload;
        },

        resetUser: (state, action) => {
            state.darkMode = action.payload;
        },
    }
})

export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer