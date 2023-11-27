import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {callDocumentFavorite, callDocumentNew} from "services/api/apiProvider";
import {getDocumentMostView} from "./mostViewReducer";
import NetInfo from "@react-native-community/netinfo";
import {Document} from "services/database/models/Document";

export const getDocumentFavorite = createAsyncThunk<any, {
    LangId: number,
    Params: string,
    Offset: number,
    Limit: number,
    isConnected:boolean
}>(
    'documentFavorite/getDocumentFavorite',
    async ({LangId, Params, Offset, Limit,isConnected}) =>
    {
        return isConnected ? await callDocumentFavorite(LangId, Params, Offset, Limit) : await Document.getNewDocument(false,true);
    }
);

const documentFavoriteSlice = createSlice({
    name: 'documentFavorite',
    initialState: {
        documentFavoriteList:[],
        isLoadingDocumentFavoriteList:false,
        isLoadOneTimeDocumentFavoriteList:false
    },
    reducers: {
        setLoadingDocumentFavoriteList:(state, action)=>{
            state.isLoadingDocumentFavoriteList=action.payload;
        },
        setDocumentFavoriteList:(state, action)=>{
            state.documentFavoriteList=action.payload;
        },
        setLoadOneTimeDocumentFavoriteList:(state, action)=>{
            state.isLoadOneTimeDocumentFavoriteList=action.payload
        },
        resetStateFavoriteList:(state)=>
        {
            state.documentFavoriteList=[];
            state.isLoadingDocumentFavoriteList= false;
            state.isLoadOneTimeDocumentFavoriteList=false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDocumentFavorite.fulfilled, (state, action) => {
            state.documentFavoriteList= action.payload;
            state.isLoadingDocumentFavoriteList=false;
            state.isLoadOneTimeDocumentFavoriteList=true;
        })
    },
});
export const {
    setLoadingDocumentFavoriteList,
    setDocumentFavoriteList,
    setLoadOneTimeDocumentFavoriteList,
    resetStateFavoriteList
}=documentFavoriteSlice.actions;
const {reducer} = documentFavoriteSlice;
export default reducer;
