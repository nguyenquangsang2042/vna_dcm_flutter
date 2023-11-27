import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Document} from "services/database/models/Document";
import {arrayIsEmpty} from "../../utils/function";

export const getRecentlyDoc = createAsyncThunk(
    'recentlyViewedDocument/getRecentlyDoc',
    async () => await Document.getDucmentRecently()
);
const recentlyViewedDocumentSlice = createSlice({
    name: 'recentlyViewedDocument',
    initialState: {
        recentlyViewedDocumentData:[],
        isLoadingRecentlyViewed:false,
        isLoadOneTimeRecentlyViewed:false

    },
    reducers: {
        addItemToRecentlyViewedDocumentData: (state, action) => {
           // @ts-ignore
            state.recentlyViewedDocumentData.push(action.payload);
        },
        setLoadingRecentlyViewedDocument:(state, action)=>{
            state.isLoadingRecentlyViewed=action.payload;
        },
        setRecentlyViewedDocument:(state, action)=>{
            state.recentlyViewedDocumentData=action.payload;
        },
        setLoadOneTimeRecentlyViewedDocument:(state, action)=>{
            state.isLoadOneTimeRecentlyViewed=action.payload
        },
        resetStateRecentlyViewedDocument:(state)=>
        {
            state.recentlyViewedDocumentData=[];
            state.isLoadingRecentlyViewed= false;
            state.isLoadOneTimeRecentlyViewed=false;
        }
    },
    extraReducers: builder => {
        // @ts-ignore
        builder.addCase(getRecentlyDoc.fulfilled, (state, action) => {
            // @ts-ignore
            state.recentlyViewedDocumentData=action.payload;
            state.isLoadingRecentlyViewed=false;
            state.isLoadOneTimeRecentlyViewed=true;
        })
    },
});
const {reducer} = recentlyViewedDocumentSlice;
export const {addItemToRecentlyViewedDocumentData,
    setLoadingRecentlyViewedDocument,
    setRecentlyViewedDocument,
    setLoadOneTimeRecentlyViewedDocument,
    resetStateRecentlyViewedDocument
}=recentlyViewedDocumentSlice.actions;
export default reducer;
