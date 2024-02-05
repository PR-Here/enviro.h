import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const googleMeetSlice = createSlice({
    name: 'googleMeet',
    initialState: {
        meetAccessToken: null,
        lastUpdatedTime: null
    },
    reducers: {
        googleMeetAccessToken: (state, action) => {
            state.meetAccessToken = action.payload;
            state.lastUpdatedTime = moment().format()
        },
    },
},
);

export const { googleMeetAccessToken } = googleMeetSlice.actions;
export default googleMeetSlice.reducer;