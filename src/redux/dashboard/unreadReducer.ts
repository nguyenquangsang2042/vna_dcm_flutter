import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {callUnReadNotify} from "services/api/apiProvider";

export const getUnReadNotify = createAsyncThunk(
    'unReadNotify/getUnReadNotify',
    async () => await callUnReadNotify('Offset,Limit,isCount', 0, 0, 1)
);
const unReadNotifySlice = createSlice({
    name: 'unReadNotify',
    initialState: 0,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUnReadNotify.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});
const {reducer} = unReadNotifySlice;
export default reducer;
