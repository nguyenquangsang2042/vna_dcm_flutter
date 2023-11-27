import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isKeyboardVisible: false,
};

const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        setKeyboardStatus: (state, action) => {
            state.isKeyboardVisible = action.payload;
        },
    },
});

export const { setKeyboardStatus } = keyboardSlice.actions;
const {reducer}=keyboardSlice;
export default reducer;
