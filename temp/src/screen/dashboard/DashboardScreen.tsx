import {ActivityIndicator, ImageBackground, SectionList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/stores';
import TextCusTom from 'components/TextCusTom';
import {ThunkDispatch} from 'redux-thunk';
import NoDataView from 'components/NoDataView';
import {FlatList, RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {arrayIsEmpty, getCurrentTimeFormatted, getParameterUrlDoc} from "../../utils/function";
import DocumentItem from "./components/DocumentItem";
import colors from "../../config/colors";
import {FontSize} from "../../config/font";
import AppBarDCM from "components/AppBarDCM";
import DocumentRecently from "services/database/models/DocumentRecently";
import {Document} from "services/database/models/Document";
import {BottomSheetMenu} from "../bottom_sheet_menu/BottomSheetMenu";
import BottomSheet from "@gorhom/bottom-sheet";
import {hideBottomSheet, showBottomSheet} from "../../redux/bottom_sheet/reducer";
import {getUnReadNotify} from "../../redux/dashboard/unreadReducer";
import {
    getViewDocumentNew,
    setDocumentNewList,
    setLoadingDocumentNewList, setLoadOneTimeDocumentNewList
} from "../../redux/dashboard/documentNewReducer";

import {
    getStandardDocNew,
    setStandardDocNew,
    setLoadingStandardDocNew, setLoadOneTimeStandardDocNew
} from "../../redux/dashboard/standardDocNewReducer";


import {
    getDocumentFavorite,
    setDocumentFavoriteList, setLoadingDocumentFavoriteList,
    setLoadOneTimeDocumentFavoriteList
} from "../../redux/dashboard/favoriteReducer";
import {
    getDocumentMostView,
    setDocumentMostViewList, setLoadingDocumentMostViewList,
    setLoadOneTimeDocumentMostViewList
} from "../../redux/dashboard/mostViewReducer";
import {
    addItemToRecentlyViewedDocumentData,
    getRecentlyDoc,
    setLoadingRecentlyViewedDocument, setLoadOneTimeRecentlyViewedDocument, setRecentlyViewedDocument
} from "../../redux/dashboard/recentlyReducer";
import ShimmerList from "components/ShimmerList";
import {goToDocumentDetail} from "navigation/goToDetailNavigation";
import {subsiteStore} from "../../config/constants";
import {StandardDoc} from "services/database/models/StandardDoc";
import StandardDocDashBoard from "services/database/models/StandardDocDashBoard";

// @ts-ignore
const DashboardScreen = ({navigation}) => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    const [dataHome, setDataHome] = useState<any>([
        {
            data: subsiteStore.getSubsite().includes("sqd") ? [
                    {
                        title: currentTranslations.document, viewDocumentNewData: []
                    },
                    {
                        title: currentTranslations.newest_docs, viewDocumentNewData: []
                    },
                    {title: currentTranslations.recently_viewed_docs, recentlyViewedDocumentData: []},
                    {title: currentTranslations.most_favourite_docs, documentMostViewData: []},
                    {title: currentTranslations.most_view_docs, documentFavoriteData: []},
                ] :
                [
                    {
                        title: currentTranslations.newest_docs, viewDocumentNewData: []
                    },
                    {title: currentTranslations.recently_viewed_docs, recentlyViewedDocumentData: []},
                    {title: currentTranslations.most_favourite_docs, documentMostViewData: []},
                    {title: currentTranslations.most_view_docs, documentFavoriteData: []},
                ]
        }
    ]);
    const [refreshing, setRefreshing] = useState(false);
    // @ts-ignore
    const {
        documentStandard,
        isLoadStandardNewList,
        isLoadOneTimeStandardNewList
    } = useSelector((state: RootState) => state.viewStandardDocNew);
    // @ts-ignore
    const {
        documentNewList,
        isLoadDocumentNewList,
        isLoadOneTimeDocumentNewList
    } = useSelector((state: RootState) => state.viewDocumentNew);
    // @ts-ignore
    const {
        documentMostViewList,
        isLoadingDocumentMostViewList,
        isLoadOneTimeDocumentMostViewList
    } = useSelector((state: RootState) => state.documentMostView);
    // @ts-ignore
    const {
        recentlyViewedDocumentData,
        isLoadingRecentlyViewed,
        isLoadOneTimeRecentlyViewed
    } = useSelector((state: RootState) => state.recentlyViewedDocument);
    // @ts-ignore
    const {
        documentFavoriteList,
        isLoadingDocumentFavoriteList,
        isLoadOneTimeDocumentFavoriteList
    } = useSelector((state: RootState) => state.documentFavorite);
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    // @ts-ignore
    const {currentSite} = useSelector((state) => state.sub_site);
    useEffect(() => {
        getData()
    }, [currentLanguage, currentSite])
    useEffect(() => {
        setDataHome([
            subsiteStore.getSubsite().includes("sqd") ?
                {
                    data: [
                        {
                            title: currentTranslations.document,
                            data: documentStandard,
                            isLoading: isLoadStandardNewList,
                            isLoadOneTime: isLoadOneTimeStandardNewList,
                        },
                        {
                            title: currentTranslations.newest_docs,
                            data: documentNewList,
                            isLoading: isLoadDocumentNewList,
                            isLoadOneTime: isLoadOneTimeDocumentNewList,
                        },
                        {
                            title: currentTranslations.recently_viewed_docs,
                            data: recentlyViewedDocumentData,
                            isLoading: isLoadingRecentlyViewed,
                            isLoadOneTime: isLoadOneTimeRecentlyViewed,
                        },
                        {
                            title: currentTranslations.most_favourite_docs,
                            data: documentFavoriteList,
                            isLoading: isLoadingDocumentFavoriteList,
                            isLoadOneTime: isLoadOneTimeDocumentFavoriteList,
                        },
                        {
                            title: currentTranslations.most_view_docs,
                            data: documentMostViewList,
                            isLoading: isLoadingDocumentMostViewList,
                            isLoadOneTime: isLoadOneTimeDocumentMostViewList,
                        },
                    ]
                } :
                {
                    data: [
                        {
                            title: currentTranslations.newest_docs,
                            data: documentNewList,
                            isLoading: isLoadDocumentNewList,
                            isLoadOneTime: isLoadOneTimeDocumentNewList,

                        },
                        {
                            title: currentTranslations.recently_viewed_docs,
                            data: recentlyViewedDocumentData,
                            isLoading: isLoadingRecentlyViewed,
                            isLoadOneTime: isLoadOneTimeRecentlyViewed,
                        },
                        {
                            title: currentTranslations.most_favourite_docs,
                            data: documentFavoriteList,
                            isLoading: isLoadingDocumentFavoriteList,
                            isLoadOneTime: isLoadOneTimeDocumentFavoriteList,
                        },
                        {
                            title: currentTranslations.most_view_docs,
                            data: documentMostViewList,
                            isLoading: isLoadingDocumentMostViewList,
                            isLoadOneTime: isLoadOneTimeDocumentMostViewList,
                        },
                    ]
                }
        ])
    }, [
        documentNewList,
        documentMostViewList,
        documentFavoriteList,
        recentlyViewedDocumentData,
        currentSite
    ])
    useEffect(() => {

    }, [recentlyViewedDocumentData]);
    const onRefresh = useCallback(() => {
        getData();
    }, []);

    const getDataNew = () => {
        Document.getNewDocument(false, false).then(values => {
            dispatch(setLoadOneTimeDocumentNewList(true));
            if (values != null && values.length > 0) {
                dispatch(setDocumentNewList(values));
            } else {
                dispatch(setLoadingDocumentNewList(true))
            }
            dispatch(getViewDocumentNew({
                LangId: langId,
                Limit: 5,
                Offset: 0,
                Params: 'LangId,Offset,Limit',
                isConnected: isConnected
            }));
        })
    }
    const getDataFavorite = () => {
        Document.getNewDocument(false, true).then(values => {
            dispatch(setLoadOneTimeDocumentFavoriteList(true));
            if (values != null && values.length > 0) {
                dispatch(setDocumentFavoriteList(values));
            } else {
                dispatch(setLoadingDocumentFavoriteList(true))
            }
            dispatch(getDocumentFavorite({
                LangId: langId,
                Params: 'Offset,Limit',
                Offset: 0,
                Limit: 5,
                isConnected: isConnected
            }))
        })
    }
    const getMostView = () => {
        Document.getNewDocument(true, false).then(values => {
            dispatch(setLoadOneTimeDocumentMostViewList(true));
            if (values != null && values.length > 0) {
                dispatch(setDocumentMostViewList(values));
            } else {
                dispatch(setLoadingDocumentMostViewList(true))
            }
            dispatch(getDocumentMostView({
                LangId: langId,
                Params: 'LangId,CategoryId,Offset,Limit',
                CategoryId: 5,
                Offset: 0,
                Limit: 5,
                isConnected: isConnected
            }))
        })

    }
    const getRecently = () => {
        Document.getDucmentRecently().then(values => {
            dispatch(setLoadOneTimeRecentlyViewedDocument(true))
            if (values != null && values.length > 0) {
                dispatch(setRecentlyViewedDocument(values));
            } else {
                dispatch(setLoadingRecentlyViewedDocument(false));
            }
            dispatch(getRecentlyDoc())
        })

    }
    const getStandard = () => {
        console.log("subsiteStore.getSubsite().includes", subsiteStore.getSubsite().includes("sqd"))
        if (subsiteStore.getSubsite().includes("sqd")) {
            Document.getStandardDocDashBoard().then(values => {
                dispatch(setLoadOneTimeStandardDocNew(true))
                if (values != null && values.length > 0) {
                    dispatch(setStandardDocNew(values));
                } else {
                    dispatch(setLoadingStandardDocNew(false));
                }
                dispatch(getStandardDocNew({LangId: langId, Params: "Top,LangId", Top: 5, isConnected: isConnected}))
            })
        }

    }
    const getData = async () => {
        getStandard();
        getRecently();
        getDataNew();
        getDataFavorite();
        getMostView();
        dispatch(getUnReadNotify());

    }
    const gotoDetailPress = (item: Document) => {
        StandardDocDashBoard.getItemByID(item.DocumentId).then((value)=>{
            console.log(" StandardDocDashBoard.getItemByID(",value);
        })
        goToDocumentDetail(navigation, item.Url, isConnected, false);
        setTimeout(() => saveItemClick(item), 1000);
    };
    const saveItemClick = async (item: Document) => {
        DocumentRecently.insertOrUpdateAll([
            {
                documentID: item.DocumentId,
                modified: getCurrentTimeFormatted()
            }
        ]);
        Document.insertOrUpdateAll([item])
        // @ts-ignore
        getRecently();
    }
    return (
        <View style={styles.root}>
                    <ImageBackground
                source={require('assets/images/background.png')}
                resizeMode="cover"
                style={styles.container}>
        <View style={styles.container}>
                <SectionList sections={dataHome}
                             refreshControl={
                                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='#0054AE'/>
                             }
                             renderItem={({item}) => (
                                 <View>
                                     <TextCusTom i18nKey={item.title} style={styles.textTitle}/>
                                     {!arrayIsEmpty(item.data) && !item.isLoading ? (
                                         <FlatList
                                             contentContainerStyle={styles.containerFlatList}
                                             data={item.data}
                                             horizontal={true}
                                             renderItem={({item}) => (
                                                 <DocumentItem item={item}
                                                               gotoDetail={() => gotoDetailPress(item)}/>
                                             )}
                                             showsHorizontalScrollIndicator={false}
                                         />
                                     ) : (
                                         (!item.isLoading && arrayIsEmpty(item.data) && item.isLoadOneTime) ? (
                                             <NoDataView/>
                                         ) : (
                                             <ShimmerList/> // Show a loading indicator when isLoading is true
                                         )
                                     )}
                                     <View style={styles.line}/>
                                 </View>
                             )}
                             keyExtractor={(item, index) => item.title}>
                </SectionList>
            </View>
                </ImageBackground>
    
        </View>
    );
};
const styles = StyleSheet.create({
    root: {flex: 1, marginBottom: 50, height: '100%'},
    container: {flex: 1, backgroundColor: 'transparent'},
    containerFlatList: {
        marginBottom: 10
    },
    textTitle: {color: colors.black, fontSize: FontSize.LARGE, fontWeight: '700', margin: 20},
    line: {
        height: 0.5,
        backgroundColor: colors.grey_co,
        marginTop: 20
    }
});
export default React.memo(DashboardScreen);
