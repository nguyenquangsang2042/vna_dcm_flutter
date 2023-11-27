import { createSlice } from '@reduxjs/toolkit';

const bottomSheetSlice = createSlice({
    name: 'bottomSheet',
    initialState: {
        isVisible: false,
    },
    reducers: {
        showBottomSheet: (state) => {
            state.isVisible = true;
        },
        hideBottomSheet: (state) => {
            state.isVisible = false;
        },
    },
});

export const { showBottomSheet, hideBottomSheet } = bottomSheetSlice.actions;
const {reducer} = bottomSheetSlice;

export default reducer;
