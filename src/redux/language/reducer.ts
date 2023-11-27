// languageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import enTranslations from '../../assets/i18n/en';
import viTranslations from '../../assets/i18n/vi';

const initialState = {
    currentLanguage: 'en', // Ngôn ngữ mặc định là tiếng Anh
    translations: {
        en: enTranslations,
        vi: viTranslations,
    },
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
    },
});

export const { changeLanguage } = languageSlice.actions;

const {reducer} = languageSlice;
export default reducer;

