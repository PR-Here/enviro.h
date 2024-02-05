// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        // Define initial notification state here
        receivedNotification: null,

    },
    reducers: {
        setReceivedNotification: (state, action) => {
            state.receivedNotification = action.payload;
        },
        clearReceivedNotification: (state) => {
            state.receivedNotification = null;
        }
    },
});

export const { setReceivedNotification, clearReceivedNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
