import type { UserType } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    loggedIn: boolean,
    user: UserType | null,
    accessToken: string | null,
    refreshToken: string | null,

}

const initialState: initialStateType = {
    loggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {

            const { user, accessToken, refreshToken } = action.payload;
    
            state.loggedIn = true;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },

        resetUser: (state) => {
            state.loggedIn = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    }
})

export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer