import { Alert, FlatList, Image, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBarCustom } from "components/AppBarCustom";
import { useNavigation } from "@react-navigation/native";
import { setSearchTerm } from "../../redux/search_result/reducer";
import { getDataViewDetailOffline } from "../detail/getDataViewDetailOffline";
import DocumentOffline from "services/database/models/DocumentOffline";
import { getCurrentTimeFormatted, isNullOrEmpty } from "../../utils/function";
import WebView from "react-native-webview";
import { BASE_URL, subsiteStore } from "../../config/constants";
import { fetchAutoID } from "services/api/apiProvider";
import { goToDocumentDetail } from "navigation/goToDetailNavigation";
import { SearchHistory } from "services/database/models/SearchHistory";
import LoadingDots from "react-native-loading-dots";



export const SearchResultScreen = () => {
    const searchTerm = useSelector((state: any) => state.search_result.searchTerm);
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const translations = useSelector((state: any) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const [keySearch, setKeySearch] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [autoID, setAutoID] = useState('');
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    const [searchHistory, setSearchHistory] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isSelectKeyWord, setisSelectKeyWord] = useState(false)

    useEffect(() => {
        SearchHistory.getAll().then(values => {
            setSearchHistory(values)
        })
    }, []);
    useEffect(() => {
        setKeySearch(searchTerm)
        fetchAutoID().then(value => setAutoID(value))
    }, []);

    // @ts-ignore
    const renderItem = ({ item }) => (

        <View style={styles.listItemContainer}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                dispatch(setSearchTerm(item.Title))
                setisSelectKeyWord(true)
            }}>
                <Text style={styles.listItemText}>{item.Title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                SearchHistory.deleteItemByTitle(item.Title).then(_ => {
                    SearchHistory.getAll().then(values => {
                        setSearchHistory(values)
                    })
                })
            }}>
                <Image
                    source={require("assets/images/icon_delete_search.png")}
                    style={styles.searchBarIcon}
                />
            </TouchableOpacity>

        </View>
    );

    //add 7.11.2023
    const handleWebViewLoadFinish = () => {
        // Set isLoading to false when the WebView finishes loading
        setIsLoading(false);
    };

    return <View style={{ backgroundColor: 'white', flex: 1 }}>
        <AppBarCustom onPress={null} navigation={navigation} title={""}
            RightControl={null} /><View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Image
                    source={require("assets/images/icon_search_1.png")}
                    style={styles.searchBarIcon} />
                <TextInput
                    onSubmitEditing={() => {
                        dispatch(setSearchTerm(keySearch));
                    }}
                    style={styles.searchInput}
                    onChangeText={(text) => setKeySearch(text)}
                    placeholder={currentTranslations.search_hint}
                    value={keySearch} />
                {keySearch.length > 0 && (
                    <TouchableOpacity onPress={() => {
                        SearchHistory.getAll().then(values => {
                            setSearchHistory(values)
                        })
                        setKeySearch("")
                    }}>
                        <Image
                            source={require("assets/images/icon_delete_search.png")}
                            style={styles.clearSearchIcon} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
        {
            isNullOrEmpty(keySearch) && !isSelectKeyWord ? <View style={styles.listContainer}>
                <FlatList data={searchHistory} renderItem={renderItem} />
            </View> :
                <WebView
                    key={searchTerm}
                    setUseWideViewPort={true}
                    javaScriptEnabled={true}
                    allowFileAccess={true}
                    originWhitelist={['*']}
                    style={{ flex: 1 }}
                    scrollEnabled={true}
                    onScroll={() => {
                        Keyboard.dismiss()
                    }}
                    onLoad={() => handleWebViewLoadFinish()}
                    // @ts-ignore
                    source={{ uri: `${BASE_URL}/${subsiteStore.getSubsite()}/frontend/pages/VNASearchDocument.aspx?kwd=${searchTerm}&searchunittype=0&gid=1&autoid=${autoID}&lang=${langId == 1066 ? "vi" : "en"}` }}
                    setSupportMultipleWindows={false}
                    onShouldStartLoadWithRequest={request => {
                        if (Platform.OS == 'ios') {
                            if (request.navigationType === "click") {
                                goToDocumentDetail(navigation, request.url.toString(), true)
                            }
                            if (request.url.includes('/frontend/pages')) {
                                return true;
                            }
                        }
                        else {
                            goToDocumentDetail(navigation, request.url.toString(), true)
                        }
                        return false;
                    }}

                />
        }
        {!isNullOrEmpty(keySearch) && isLoading && (
            <View style={styles.dotsWrapper}>
                <LoadingDots />
            </View>
        )}

    </View>
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    searchBarContainer: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#DBA410",
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: "#FFFAEE",
    },
    dotsWrapper: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '45%',
        left: '42%',
        zIndex: 1
    },
    searchBarIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    clearSearchIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    listItemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
    },
    listContainer: {
        paddingHorizontal: 15,
    },
    listTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: "heritage_bold",
        lineHeight: 20,
    },
    listItemText: {
        fontSize: 16,
        fontFamily: "heritage_regular",
        lineHeight: 20,
    },
})
