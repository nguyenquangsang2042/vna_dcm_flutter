import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import languageReducer from './language/reducer';
import authReducer from './auth/reducer';
import loginReducer from "./login/loginReducer";
import bottomSheetReducer from './bottom_sheet/reducer';
import unreadReducer from "./dashboard/unreadReducer";
import recentlyReducer from "./dashboard/recentlyReducer";
import mostViewReducer from "./dashboard/mostViewReducer";
import favoriteReducer from "./dashboard/favoriteReducer";
import documentNewReducer from "./dashboard/documentNewReducer";
import profileReducer from "./profile/reducer";
import categoryReducer from "./category/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist';
import Flatted from "flatted";
import { createTransform } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import netInfoReducer from './net_info/reducer';
import appBarReducer from './app_bar_dasboard/reducer'
import loadMoreListReducer from './list_load_more/reducer'
import keyboardReducer from './keyboard/reducer'
import searchResultReducer from './search_result/reducer'
import favoriteFolderReducer from './favorite/reducer'
import subSiteReducer from './subsite/reducer'
import standardDocReducer from './standard_doc/reducer'
import  viewStandardDocNewReducer from './dashboard/standardDocNewReducer'
const rootReducer = combineReducers({
    auth: authReducer,
    login: loginReducer,
    languages: languageReducer,
    bottomSheet: bottomSheetReducer,
    unReadNotify: unreadReducer,
    recentlyViewedDocument: recentlyReducer,
    documentMostView: mostViewReducer,
    documentFavorite: favoriteReducer,
    viewDocumentNew: documentNewReducer,
    profile:profileReducer,
    category:categoryReducer,
    netInfo: netInfoReducer,
    appbar:appBarReducer,
    loadMoreList:loadMoreListReducer,
    keyboard:keyboardReducer,
    search_result:searchResultReducer,
    favorite:favoriteFolderReducer,
    sub_site:subSiteReducer,
    standard_doc:standardDocReducer,
    viewStandardDocNew:viewStandardDocNewReducer
});
const transformCircular = createTransform(
    (inboundState, key) => Flatted.stringify(inboundState),
    (outboundState, key) => Flatted.parse(outboundState),
)
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // Thêm whitelist để chỉ định các reducer cần lưu trữ
    whitelist: [
        'unReadNotify',
        'recentlyViewedDocument',
        'documentMostView',
        'viewDocumentNew',
        'languages',
        'sub_site',
        'viewStandardDocNew'
    ],
    transforms:[transformCircular],
    stateReconciler: autoMergeLevel2,
};
// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false, // Tắt kiểm tra serializable
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export {store};
export const persistor = persistStore(store);

