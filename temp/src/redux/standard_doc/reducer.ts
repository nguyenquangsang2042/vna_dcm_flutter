import {createSlice} from "@reduxjs/toolkit";

const standardDocSlice = createSlice({
    name: "standard_doc",
    initialState: {
        positionStayStandardDoc: [],
    },
    reducers: {
        addPositionStayStandardDoc: (state, action) => {
            // @ts-ignore
            state.positionStayStandardDoc.push(action.payload);
        },
        removeLastPositionStayStandardDoc: (state) => {
            state.positionStayStandardDoc.pop();
        },
        removeAllPositionStayStandardDoc:(state)=>{
            state.positionStayStandardDoc=[]
        }
    }
});
export const {
    addPositionStayStandardDoc,
    removeLastPositionStayStandardDoc,
    removeAllPositionStayStandardDoc
} = standardDocSlice.actions;
const {reducer} = standardDocSlice;

export default reducer;
