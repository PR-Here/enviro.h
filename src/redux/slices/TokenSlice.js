
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        dbCall: null,
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefrestToken: (state, action) => {
            state.refreshToken = action.payload
        },
        setDbCall: (state, action) => {
            state.dbCall = action.payload
        },
        logoutSession: (state) => {
            state.dbCall = null
            state.accessToken = null
            state.refreshToken = null
        },
    },
});

export const { setAccessToken, setRefrestToken, setDbCall, logoutSession } = tokenSlice.actions;
export default tokenSlice.reducer;
