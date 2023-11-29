import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {callDocumentNew} from "services/api/apiProvider";
import NetInfo from "@react-native-community/netinfo";
import {Document} from "services/database/models/Document";

export const getViewDocumentNew = createAsyncThunk<any, {
    LangId: number,
    Params: string,
    Offset: number,
    Limit: number,
    isConnected:boolean
}>(
    'viewDocumentNew/getViewDocumentNew',
    async ({LangId, Params, Offset, Limit,isConnected}) => {
        return isConnected ? await callDocumentNew(LangId, Params, Offset, Limit) : await Document.getNewDocument(false,false);
    }
);
const viewDocumentNewSlice = createSlice({
    name: 'viewDocumentNew',
    initialState: {
        documentNewList: [],
        isLoadDocumentNewList: false,
        isLoadOneTimeDocumentNewList:false
    },
    reducers: {
        setLoadingDocumentNewList:(state, action)=>{
            state.isLoadDocumentNewList=action.payload;
        },
        setDocumentNewList:(state, action)=>{
            state.documentNewList=action.payload;
        },
        setLoadOneTimeDocumentNewList:(state, action)=>{
            state.isLoadOneTimeDocumentNewList=action.payload
        },
        resetStateNewList:(state)=>
        {
            state.documentNewList=[];
            state.isLoadDocumentNewList= false;
            state.isLoadOneTimeDocumentNewList=false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getViewDocumentNew.fulfilled, (state, action) => {
            state.documentNewList = action.payload;
            state.isLoadDocumentNewList=false;
            state.isLoadOneTimeDocumentNewList=true;

        });
    },
});
export const {
    setDocumentNewList,
    setLoadingDocumentNewList,
    setLoadOneTimeDocumentNewList,
    resetStateNewList
}=viewDocumentNewSlice.actions;
const {reducer} = viewDocumentNewSlice;
export default reducer;
