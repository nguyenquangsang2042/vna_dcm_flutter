import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    columnFlatlist:1
};

const loadMoreListSlice = createSlice({
    name: 'loadMoreList',
    initialState,
    reducers: {
        changeColumnFlatList: (state, action) => {
            state.columnFlatlist = action.payload;
        },
    },
});

export const { changeColumnFlatList } = loadMoreListSlice.actions;
const {reducer}= loadMoreListSlice;
export default reducer;
