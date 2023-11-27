import {AppNavigationContainer} from 'navigation/appNavigationContainer';
import {BottomNavigationContainer} from "navigation/bottomNavigation";
import {BottomSheetMenu} from "../bottom_sheet_menu/BottomSheetMenu";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert, BackHandler, Keyboard, Text, View} from 'react-native';
import {hideBottomSheet, showBottomSheet} from "../../redux/bottom_sheet/reducer";
import AppBarDCM from "components/AppBarDCM";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../redux/stores";
import {ProfileScreen} from "../profile/ProfileScreen";
import {hideProfile} from "../../redux/profile/reducer";
import {AppBarCustom} from "components/AppBarCustom";
import {useNavigation} from "@react-navigation/native";
import {setChildCategory, setChildFavorite} from "../../redux/app_bar_dasboard/reducer";
import { removeLastPositionStayCategory} from "../../redux/category/reducer";
import {removeLastPositionStayFavorite} from "../../redux/favorite/reducer";
import {SubSiteScreen} from "../subsite/SubSiteScreen";
import {subsiteStore} from "../../config/constants";
// @ts-ignore
import PushNotification from "react-native-push-notification";
import {goToDocumentDetail} from "navigation/goToDetailNavigation";

export const TabsScreen = () => {

    const navigation= useNavigation();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const {isVisible} = useSelector((state: any) => state.bottomSheet);
    const notificationCount = useSelector((state: any) => state.unReadNotify);
    const {isChildCategory,isChildFavorite,indexTab} = useSelector((state: any) => state.appbar);
    const {isKeyboardVisible} = useSelector((state: any) => state.keyboard);
    const positionStayCategory=useSelector((state:any)=>state.category.positionStayCategory);
    const positionStayFavorite=useSelector((state:any)=>state.favorite.positionStayFavorite);
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);

    const title= subsiteStore.getSubsite().includes('sqd')?
        (indexTab==0&&currentTranslations.bottomtab_home)
        ||(indexTab==1&&currentTranslations.bottomtab_category)
        ||(indexTab==2&&currentTranslations.bottomtab_search)
        ||(indexTab==3&&currentTranslations.bottomtab_favourite)
        ||(indexTab==4&&currentTranslations.document)
        :(indexTab==0&&currentTranslations.bottomtab_home)
        ||(indexTab==1&&currentTranslations.bottomtab_category)
        ||(indexTab==2&&currentTranslations.bottomtab_search)
        ||(indexTab==3&&currentTranslations.bottomtab_favourite)


    useEffect(() => {
        PushNotification.configure({
            onNotification: (notification:any)=>{
                console.log("notification.data.URL",notification);
                goToDocumentDetail(navigation, notification.data.URL, isConnected, false);
            }
        });
    }, []);
    return <>
        {
            !isChildCategory && !isChildFavorite?<AppBarDCM title={title} notificationCount={notificationCount}
                                       urlOnline={''}
                                       onPress={() => {
                                           Keyboard.dismiss();
                                           dispatch(isVisible ? hideBottomSheet() : showBottomSheet());
                                           dispatch(hideProfile());
                                       }}/>:
            <AppBarCustom onPress={()=>{
                if(isChildCategory)
                {
                    if(positionStayCategory.length==1)
                    {
                        dispatch(setChildCategory(false))
                    }
                    dispatch(removeLastPositionStayCategory())
                }
                if(isChildFavorite){
                    if(positionStayFavorite.length==1)
                    {
                        dispatch(setChildFavorite(false))
                    }
                    dispatch(removeLastPositionStayFavorite())
                }
            }} navigation={navigation} title={""} RightControl={null}/>
        }
        <BottomNavigationContainer/>
        {!isKeyboardVisible&&<BottomSheetMenu/>}
        {!isKeyboardVisible&&<ProfileScreen/>}
        {!isKeyboardVisible&&<SubSiteScreen/>}

    </>;
};
