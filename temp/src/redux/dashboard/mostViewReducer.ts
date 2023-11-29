import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {callDocumentFavorite, callDocumentMostView} from "services/api/apiProvider";
import {getViewDocumentNew} from "./documentNewReducer";
import NetInfo from "@react-native-community/netinfo";
import {Document} from "services/database/models/Document";

export const getDocumentMostView = createAsyncThunk<any, {
    LangId: number,
    Params: string,
    CategoryId: number,
    Offset: number,
    Limit: number,
    isConnected: boolean
}>(
    'documentMostView/getDocumentMostView',
    async ({
               LangId,
               Params,
               CategoryId,
               Offset,
               Limit,
               isConnected
           }) => {
        return isConnected ? await callDocumentMostView(LangId, Params, CategoryId, Offset, Limit) : await Document.getNewDocument(true, false);

    }
);
const documentMostViewSlice = createSlice({
    name: 'documentMostView',
    initialState: {
        documentMostViewList: [],
        isLoadingDocumentMostViewList: false,
        isLoadOneTimeDocumentMostViewList:false
    },
    reducers:  {
        setLoadingDocumentMostViewList:(state, action)=>{
            state.isLoadingDocumentMostViewList=action.payload;
        },
        setDocumentMostViewList:(state, action)=>{
            state.documentMostViewList=action.payload;
        },
        setLoadOneTimeDocumentMostViewList:(state, action)=>{
            state.isLoadOneTimeDocumentMostViewList=action.payload
        },
        resetStateMostViewList:(state)=>
        {
            state.documentMostViewList=[];
            state.isLoadingDocumentMostViewList= false;
            state.isLoadOneTimeDocumentMostViewList=false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDocumentMostView.fulfilled, (state, action) => {
            state.documentMostViewList = action.payload;
            state.isLoadingDocumentMostViewList=false;
            state.isLoadOneTimeDocumentMostViewList=true;
        })
    },
});
export const {
    setLoadingDocumentMostViewList,
    setDocumentMostViewList,
    setLoadOneTimeDocumentMostViewList,
    resetStateMostViewList
}=documentMostViewSlice.actions;

const {reducer} = documentMostViewSlice;
export default reducer;
