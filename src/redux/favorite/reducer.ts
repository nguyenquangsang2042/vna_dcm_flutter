import {createSlice} from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        positionStayFavorite: [],
    },
    reducers: {
        addPositionStayFavorite: (state, action) => {
            // @ts-ignore
            state.positionStayFavorite.push(action.payload);
        },
        removeLastPositionStayFavorite: (state) => {
            state.positionStayFavorite.pop();
        },
        removeAllPositionStayFavorite:(state)=>{
            state.positionStayFavorite=[]
        }
    }
});
export const {
    addPositionStayFavorite,
    removeLastPositionStayFavorite,
    removeAllPositionStayFavorite
} = favoriteSlice.actions;
const {reducer} = favoriteSlice;

export default reducer;
