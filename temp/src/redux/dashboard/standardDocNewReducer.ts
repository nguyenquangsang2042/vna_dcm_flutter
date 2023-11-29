import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {callDocumentNew, callStandardDoc} from "services/api/apiProvider";
import NetInfo from "@react-native-community/netinfo";
import {Document} from "services/database/models/Document";
import StandardDocDashBoard from "services/database/models/StandardDocDashBoard";

export const getStandardDocNew = createAsyncThunk<any, {
    LangId: number,
    Params: string,
    Top: number,
    isConnected:boolean
}>(
    'viewStandardDocNew/getStandardDocNew',
    async ({LangId, Params, Top,isConnected}) => {
        return isConnected ? await callStandardDoc(LangId, Params,Top) : await Document.getStandardDocDashBoard();
    }
);
const viewStandardDocNewSlice = createSlice({
    name: 'viewStandardDocNew',
    initialState: {
        documentStandard: [],
        isLoadStandardNewList: false,
        isLoadOneTimeStandardNewList:false
    },
    reducers: {
        setLoadingStandardDocNew:(state, action)=>{
            state.isLoadOneTimeStandardNewList=action.payload;
        },
        setStandardDocNew:(state, action)=>{
            state.documentStandard=action.payload;
        },
        setLoadOneTimeStandardDocNew:(state, action)=>{
            state.isLoadOneTimeStandardNewList=action.payload
        },
        resetStateStandardDocNew:(state)=>
        {
            state.documentStandard=[];
            state.isLoadStandardNewList= false;
            state.isLoadOneTimeStandardNewList=false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStandardDocNew.fulfilled, (state, action) => {
            state.documentStandard = action.payload;
            state.isLoadStandardNewList=false;
            state.isLoadOneTimeStandardNewList=true;

        });
    },
});
export const {
    setLoadingStandardDocNew,
    setStandardDocNew,
    setLoadOneTimeStandardDocNew,
    resetStateStandardDocNew
}=viewStandardDocNewSlice.actions;
const {reducer} = viewStandardDocNewSlice;
export default reducer;
