import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isVisibleProfile: false,
    },
    reducers: {
        showProfile: (state) => {
            state.isVisibleProfile = true;
        },
        hideProfile: (state) => {
            state.isVisibleProfile = false;
        },
    },
});

export const { showProfile, hideProfile } = profileSlice.actions;
const {reducer} = profileSlice;

export default reducer;
