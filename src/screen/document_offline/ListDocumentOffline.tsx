import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import { ListLoadMore } from "components/ListLoadMore";
import { getDocumentInteractive } from "services/api/apiProvider";
import { useSelector } from "react-redux";
import { currentUserStore } from "../../config/constants";
import { dimensWidth } from "../../config/font";
import { format_dd_mm_yy, isNullOrEmpty } from "../../utils/function";
import { AppBarCustom } from "components/AppBarCustom";
import { DocumentInteractive } from "services/database/models/DocumentInteractive";
import { goToDocumentDetail } from "navigation/goToDetailNavigation";
import DocumentOffline from "services/database/models/DocumentOffline";
import TouchableOption from "./component/TouchableOption";
import { FastImageCustom } from "components/FastImageCustom";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import {Swipeable} from "react-native-gesture-handler";

// @ts-ignore
export const ListDocumentOffline = ({ navigation }) => {
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const [keySearch, setKeySearch] = useState("");
    const [type, setType] = useState(0);

    // @ts-ignore
    const itemRender = ({ item, index,onDeleteItem  }) => {
        // @ts-ignore
        const rightAction = (progress, dragX) => {
            const scale = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [1, 0.5],
                extrapolate: 'clamp',
            });

            return (
                <TouchableOpacity onPress={() => {
                    onDeleteItem(index);
                    DocumentOffline.deleteByDocumentID(item.DocumentId)
                }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems:'center',
                            width: 50,
                            height: '100%',
                        }}
                    >
                        <Animated.Image
                            source={require('assets/images/icon_delete_text.png')}
                            style={{
                                width:25,
                                height:25,
                                paddingHorizontal: 10,
                                transform: [{ scale }],
                            }}
                        />
                    </View>
                </TouchableOpacity>
            );
        };

        return (
            <Swipeable containerStyle={{backgroundColor:index % 2 === 0 ? '#F1FAFF' : 'white' }} renderRightActions={rightAction}>
                <TouchableOpacity onPress={() => goToDocumentDetail(navigation, item.Url, false,false)}>
                    <View style={[styles.rowContainer, { backgroundColor: index % 2 === 0 ? '#F1FAFF' : 'white' }]}>
                        <FastImageCustom
                            urlOnline={item.Thumbnail}
                            defaultImage={require('assets/images/icon_document_default.png')}
                            styleImg={styles.fastImage}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                        <View style={{ flex: 1 }}>
                            <Text>{item.Title}</Text>
                            <Text>{item.TitleEN}</Text>
                        </View>
                        {!isNullOrEmpty(item.modified) && (
                            <View>
                                <Text>{format_dd_mm_yy(item.modified)}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </Swipeable>
        );
    };

    const getData =()=>{
        return DocumentOffline.getAll(keySearch.toLowerCase(), type);
    }

    return (
        <View style={{height:'100%',width:'100%'}}>
            <View style={styles.container}>
            <AppBarCustom onPress={null} navigation={navigation} title={currentTranslations.text_offline} RightControl={null} />
            <View style={{ width: '100%', height: 0.75, backgroundColor: 'grey' }} />
            <View style={{ padding: 10, backgroundColor: 'white' }}>
                <View style={styles.searchBarContainer}>
                    <Image
                        source={require('assets/images/icon_search_1.png')}
                        style={styles.searchBarIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={(text) => setKeySearch(text)}
                        placeholder={currentTranslations.search_hint}
                        value={keySearch}
                    />
                    {keySearch.length > 0 && (
                        <TouchableOpacity onPress={() => setKeySearch("")}>
                            <Image
                                source={require('assets/images/icon_delete_search.png')}
                                style={styles.clearSearchIcon}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.optionContainer}>
                <TouchableOption active={type === 0} onPress={() => setType(0)} label={currentTranslations.all} />
                <TouchableOption active={type === 1} onPress={() => setType(1)} label={currentTranslations.t_n_v_n_b_n} />
                <TouchableOption active={type === 2} onPress={() => setType(2)} label={currentTranslations.t_n_vi_t_t_t} />
            </View>
            <View style={styles.container}>
                <ListLoadMore key={keySearch + type} numColumn={1} callData={getData} ItemRenderFlatlist={itemRender} limit={15} enableMoreData={true} />
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    fastImage: {
        height: 45,
        width: 30,
        borderRadius: dimensWidth(0),
    },
    searchBarContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DBA410',
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#FFFAEE',
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
    optionContainer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});

