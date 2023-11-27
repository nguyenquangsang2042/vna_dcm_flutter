import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        positionStayCategory: [],
    },
    reducers: {
        addPositionStayCategory: (state, action) => {
            // @ts-ignore
            state.positionStayCategory.push(action.payload);
        },
        removeLastPositionStayCategory: (state) => {
            state.positionStayCategory.pop();
        },
        removeAllPositionStayCategory:(state)=>{
            state.positionStayCategory=[]
        }
    }
});
export const {
    addPositionStayCategory,
    removeLastPositionStayCategory,
    removeAllPositionStayCategory
} = categorySlice.actions;
const {reducer} = categorySlice;

export default reducer;
