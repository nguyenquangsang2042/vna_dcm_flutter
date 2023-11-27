// textSearchSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {getCurrentTimeFormatted, isNullOrEmpty} from "../../utils/function";
import {SearchHistory} from "services/database/models/SearchHistory";

const searchResultSlice = createSlice({
    name: 'search_result',
    initialState: {
        searchTerm: '', // Initial search term is empty
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            if (!isNullOrEmpty(action.payload)) {
                SearchHistory.insertOrUpdateAll([{
                    Title: action.payload,
                    Modified: getCurrentTimeFormatted()
                }])
            }
        },
    },
});

export const { setSearchTerm } = searchResultSlice.actions;
const {reducer}=searchResultSlice;
export default reducer;
