import React, {useEffect, useMemo, useRef, useState} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {useDispatch, useSelector} from "react-redux";
import {Alert, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {hideSubSite, setSubSite} from "../../redux/subsite/reducer";
import {SubSite} from "services/database/models/SubSite";
import {Comment} from "services/database/models/Comment";
import {ConfigNotification} from "services/database/models/ConfigNotification";
import {Document} from "services/database/models/Document";
import {DocumentAreaCategory} from "services/database/models/DocumentAreaCategory";
import {DocumentCategory} from "services/database/models/DocumentCategory";
import {DocumentFavorite} from "services/database/models/DocumentFavorite";
import {DocumentInteractive} from "services/database/models/DocumentInteractive";
import DocumentOffline from "services/database/models/DocumentOffline";
import DocumentRecently from "services/database/models/DocumentRecently";
import {DocumentType} from "services/database/models/DocumentType";
import {FavoriteFolder} from "services/database/models/FavoriteFolder";
import {SearchHistory} from "services/database/models/SearchHistory";
import {hideBottomSheet} from "../../redux/bottom_sheet/reducer";
import {hideProfile} from "../../redux/profile/reducer";
import {getViewDocumentNew, resetStateNewList} from "../../redux/dashboard/documentNewReducer";
import {getDocumentFavorite, resetStateFavoriteList} from "../../redux/dashboard/favoriteReducer";
import {getDocumentMostView, resetStateMostViewList} from "../../redux/dashboard/mostViewReducer";
import {getRecentlyDoc, resetStateRecentlyViewedDocument} from "../../redux/dashboard/recentlyReducer";
import {BaseSubSite, subsiteStore} from "../../config/constants";
import {callLogin, getAllMasterData, getCategoryDefine, GetSettingsByKey} from "services/api/apiProvider";
import {StandardDoc} from "services/database/models/StandardDoc";
import {
    getModified,
    getPassword,
    getSiteChangeType,
    getUsername,
    saveModified,
    saveSiteChangeType
} from "../../utils/asyncStrorage";
import {getCurrentTimeFormatted} from "../../utils/function";
import {setIndexTab, setTitleAppBar} from "../../redux/app_bar_dasboard/reducer";
import {useNavigation} from "@react-navigation/native";
import {BottomSheetMenu} from "../bottom_sheet_menu/BottomSheetMenu";
import {getUnReadNotify} from "../../redux/dashboard/unreadReducer";
import {getStandardDocNew, resetStateStandardDocNew} from "../../redux/dashboard/standardDocNewReducer";
import StandardDocDashBoard from "services/database/models/StandardDocDashBoard";

export const SubSiteScreen = () => {
    const navigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['90%'], []);
    const {isVisibleSubSite} = useSelector((state: any) => state.sub_site);
    const dispatch = useDispatch();

    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const [listSite, setListSite] = useState();
    const {indexTab} = useSelector((state: any) => state.appbar);
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);

    useEffect(() => {
        SubSite.getAll().then(value => {
            // @ts-ignore
            setListSite(value);
        })
    }, []);
    useEffect(() => {
        // @ts-ignore
        if (Platform.OS !== 'ios') {
            // @ts-ignore
            bottomSheetRef.current.snapToPosition(0)
        }

    }, [isVisibleSubSite]);
    const handleSheetChanges = (index: number) => {
        if (index == -1)
            dispatch(hideSubSite());
    }

    const removeData = async () => {
        Comment.deleteAll();
        ConfigNotification.deleteAll();
        Document.deleteAll();
        DocumentAreaCategory.deleteAll();
        DocumentCategory.deleteAll();
        DocumentFavorite.deleteAll();
        DocumentInteractive.deleteAll();
        DocumentRecently.deleteAll();
        DocumentType.deleteAll();
        FavoriteFolder.deleteAll();
        SearchHistory.deleteAll();
        StandardDocDashBoard.deleteAll();
        dispatch(hideBottomSheet());
        dispatch(hideProfile());
        dispatch(hideSubSite());
        dispatch(resetStateNewList());
        dispatch(resetStateRecentlyViewedDocument());
        dispatch(resetStateFavoriteList());
        dispatch(resetStateMostViewList());
        dispatch(resetStateStandardDocNew());
        dispatch(hideBottomSheet());
        await saveModified("");
    }


    // @ts-ignore
    return <BottomSheet
        ref={bottomSheetRef}
        index={isVisibleSubSite ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        containerStyle={isVisibleSubSite && styles.containerStyle}
        backgroundStyle={styles.bottomSheetStyle}
    >
        <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => {
                dispatch(hideSubSite());
                if (Platform.OS === 'ios') {
                    // @ts-ignore
                    bottomSheetRef.current.snapToPosition(0)
                }
            }}>
                <Image
                    style={styles.image}
                    source={require('assets/images/icon_arrow.png')}
                    resizeMode="contain"
                    // @ts-ignore
                    transform={[{rotate: '180deg'}]}
                />
            </TouchableOpacity>
            <Text style={styles.centeredText}>{currentTranslations.account}</Text>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                bottomSheetRef.current.snapToPosition(-1)
            }}>
            </TouchableOpacity>
        </View>
        {
            listSite != undefined && <View
                style={{padding: 10, backgroundColor: 'white', borderRadius: 12, marginLeft: 20, marginRight: 20}}><FlatList
                data={listSite}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={async () => {
                        if (!subsiteStore.getSubsite().includes(item.SubSite)) {
                            await removeData();
                            subsiteStore.setSubsite(item.SubSite);
                            const user = await getUsername();
                            const pass = await getPassword();
                            callLogin(user, pass).then(async(_)=>{
                                if (subsiteStore.getSubsite().includes("sqd")) {
                                    getCategoryDefine().then(value => {
                                        StandardDoc.insertOrUpdateAll(value)
                                    })
                                }
                                const modified = await getModified();
                                const siteChangeType = await getSiteChangeType();
                                if (indexTab == 0) {
                                   if(subsiteStore.getSubsite().includes("sqd"))
                                   {
                                       // @ts-ignore
                                       dispatch(getStandardDocNew({LangId:langId, Params:"Top,LangId",Top: 5, isConnected:isConnected}))
                                   }
                                    // @ts-ignore
                                    dispatch(getViewDocumentNew({LangId: langId, Limit: 5, Offset: 0, Params: 'LangId,Offset,Limit', isConnected: isConnected}));
                                    // @ts-ignore
                                    dispatch(getRecentlyDoc());
                                    // @ts-ignore
                                    dispatch(getDocumentFavorite({LangId: langId, Params: 'Offset,Limit', Offset: 0, Limit: 5, isConnected: isConnected}));
                                    // @ts-ignore
                                    dispatch(getDocumentMostView({
                                        LangId: langId,
                                        Params: 'LangId,CategoryId,Offset,Limit',
                                        CategoryId: 5,
                                        Offset: 0,
                                        Limit: 5,
                                        isConnected: isConnected
                                    }));
                                    // @ts-ignore
                                    dispatch(getUnReadNotify());
                                } else
                                    dispatch(setIndexTab(0));
                                getAllMasterData("DocumentAreaCategory,FavoriteFolder,DocumentType", modified).then(values => {
                                    DocumentAreaCategory.insertOrUpdateAll(values.DocumentAreaCategory);
                                    FavoriteFolder.insertOrUpdateAll(values.FavoriteFolder);
                                    DocumentType.insertOrUpdateAll(values.DocumentType);
                                    saveModified(getCurrentTimeFormatted());
                                    dispatch(setSubSite(item.SubSite));
                                    if (siteChangeType === "1") {
                                        Alert.alert("", `Bạn đã truy cập thành công Tài liệu nội bộ của ${item.Title}`);
                                    } else if (siteChangeType === "2") {
                                        dispatch(setTitleAppBar(item.Title));
                                    } else if (siteChangeType === "3") {
                                        Alert.alert("", `Bạn đã truy cập thành công Tài liệu nội bộ của ${item.Title}`);
                                        dispatch(setTitleAppBar(item.Title));
                                    } else {
                                        dispatch(setTitleAppBar(""));
                                    }
                                    GetSettingsByKey("SiteChangeType").then(value => {
                                        if (value != undefined && value != null && value.length > 0 && value[0].VALUE != null)
                                            saveSiteChangeType(value[0].VALUE)
                                    })

                                    if (Platform.OS === 'ios') {
                                        // @ts-ignore
                                        bottomSheetRef.current.snapToPosition(0)

                                    }
                                    // @ts-ignore
                                    if (indexTab != 0)
                                    {
                                        // @ts-ignore
                                        navigation.navigate("Home");
                                    }
                                });

                            })
                           }
                    }}>
                        <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                            <Image
                                style={styles.image}
                                source={require('assets/images/icon_site.png')}
                                resizeMode="contain"
                            />
                            <Text style={{
                                width: "80%",
                                marginLeft: 10
                            }}>{currentLanguage == 'en' ? item.TitleEN : item.Title} </Text>
                            {
                                subsiteStore.getSubsite().includes(item.SubSite) && <Image
                                    style={styles.image}
                                    source={require('assets/images/icon_currentsite.png')}
                                    resizeMode="contain"

                                />
                            }
                        </View>
                        {
                            // @ts-ignore
                            listSite != null && true && index != listSite.length - 1 &&
                            <View style={{wight: '100%', height: 0.7, backgroundColor: 'grey'}}/>
                        }
                    </TouchableOpacity>
                )}/></View>
        }

    </BottomSheet>
}
const styles = StyleSheet.create({

    image: {
        height: 20,
        wight: 20,
    },
    accountname: {
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    fullname: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'heritage_regular',
        lineHeight: 20,
    },
    infor: {
        flexDirection: 'column'
    },
    parentBorder: {
        alignItems: 'center'
    },
    cardDoc: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        width: "90%",
        marginTop: 25
    },
    cardInfo: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        width: "90%",
    },
    parentBorderContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
    },

    containerStyle: {
        backgroundColor: 'rgba(128, 128, 128, 0.6)'
    },
    bottomSheetStyle: {
        backgroundColor: '#F2F3F7',
        borderRadius: 12
    },
    topContainer: {
        flexDirection: 'row', // Arrange children in a row
        alignItems: 'center', // Center vertically
        padding: 16,
    },
    centeredText: {
        flex: 1,
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    rightText: {
        textAlign: 'right',
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
});
