import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isHomePage:true,
    isChildCategory:false,
    isChildFavorite:false,
    isChildStandardDoc:false,
    indexTab:0,
    titleAppBar:""
};

const appBarSlice = createSlice({
    name: 'appbar',
    initialState,
    reducers: {
        setHomePageState: (state, action) => {
            state.isHomePage= action.payload;
        },
        setTitleAppBar: (state, action) => {
            state.titleAppBar= action.payload;
        },
        setChildCategory:(state, action) => {
            state.isChildCategory= action.payload;
        },
        setChildFavorite:(state, action) => {
            state.isChildFavorite= action.payload;
        },
        setChildStandardDoc:(state, action) => {
            state.isChildStandardDoc= action.payload;
        },
        setIndexTab:(state, action) => {
            state.indexTab= action.payload;
        },
    },
});

export const {
    setHomePageState,
    setChildCategory ,
    setChildFavorite,
    setIndexTab,
    setChildStandardDoc,
    setTitleAppBar
} = appBarSlice.actions;
const {reducer}=appBarSlice;
export default reducer;
