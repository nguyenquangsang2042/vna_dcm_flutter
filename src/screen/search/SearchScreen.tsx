import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Image,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    FlatList,
} from "react-native";
import {currentUserStore} from "../../config/constants";
import {setSearchTerm} from "../../redux/search_result/reducer";
import {useNavigation} from "@react-navigation/native";
import {SearchHistory} from "services/database/models/SearchHistory";
import {getCurrentTimeFormatted, isNullOrEmpty} from "../../utils/function";
import * as Animatable from 'react-native-animatable';

export const SearchScreen = () => {
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const translations = useSelector((state: any) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const [keySearch, setKeySearch] = useState("");
    const data = currentUserStore.getCurrentUser().TopUsedKey.split(",");
    const searchTerm = useSelector((state: any) => state.search_result.searchTerm);
    const [isSelectSearch, setisSelectSearch] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        setKeySearch(searchTerm)
    }, [searchTerm]);




    // @ts-ignore
    const renderItem = ({item,index}) => (

        <TouchableOpacity onPress={() => {
            // @ts-ignore
            navigation.navigate('search_result')
            dispatch(setSearchTerm(item))
        }}>
                <Animatable.View 
        animation= {'fadeInLeftBig'}
        duration={1000}
        delay={index * 300}
        >
      <View style={styles.listItemContainer}>
                <Image
                    source={require("assets/images/icon_search_1.png")}
                    style={styles.searchBarIcon}
                />
                <Text style={styles.listItemText}>{item}</Text>
            </View>
        </Animatable.View>
      
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground
                source={require("assets/images/background.png")}
                style={styles.imgBackground}
            >
                <View style={styles.container} >
                    <TouchableOpacity style={styles.searchBarContainer} onPress={() => {
                              navigation.navigate('search_result')
                              dispatch(setSearchTerm(keySearch))
                            }}>
                        <Image
                            source={require("assets/images/icon_search_1.png")}
                            style={styles.searchBarIcon}
                        />
                      <TextInput
                            onSubmitEditing={() => {
                                // @ts-ignore
                                navigation.navigate('search_result')
                                dispatch(setSearchTerm(keySearch))
                            }}
                            style={styles.searchInput}
                            onChangeText={(text) => {
                                setKeySearch(text)
                            }}
                            placeholder={currentTranslations.search_hint}
                            value={keySearch}
                        />


                        {keySearch.length > 0 && (
                            <TouchableOpacity onPress={() => setKeySearch("")}>
                                <Image
                                    source={require("assets/images/icon_delete_search.png")}
                                    style={styles.clearSearchIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                </View>
                {data !== undefined && data.length > 0 && (
                    <View style={styles.listContainer}>
                        <Text style={styles.listTitle}>{currentTranslations.trend}</Text>
                        <FlatList data={data}  renderItem={renderItem}/>
                    </View>
                )}
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    imgBackground: {
        height: "100%",
        width: "100%",
    },
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
    listContainer: {
        paddingHorizontal: 15,
    },
    listTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: "heritage_bold",
        lineHeight: 20,
    },
    listItemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
    },
    listItemText: {
        fontSize: 16,
        fontFamily: "heritage_regular",
        lineHeight: 20,
    },
});
