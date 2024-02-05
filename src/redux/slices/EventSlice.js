// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        status: null,
        message: '',
        list: null,
        screenName: '',
        eventDetails: null
    },
    reducers: {
        fetchEvents: (state, action) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.list = action.payload.data
        },
        setEventDetails: (state, action) => {
            state.eventDetails = action.payload
        },
        hubScreens: (state, action) => {
            state.screenName = action.payload
        }
    },
},
);

export const { fetchEvents, setEventDetails, hubScreens, } = eventSlice.actions;

export default eventSlice.reducer;
