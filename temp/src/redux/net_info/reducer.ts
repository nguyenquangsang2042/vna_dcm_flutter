// netInfoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isConnected: null, // Trạng thái ban đầu của kết nối
};

const netInfoSlice = createSlice({
    name: 'netInfo',
    initialState,
    reducers: {
        setConnectionStatus: (state, action) => {
            state.isConnected = action.payload;
        },
    },
});

export const { setConnectionStatus } = netInfoSlice.actions;

const {reducer} = netInfoSlice;

export default reducer;
