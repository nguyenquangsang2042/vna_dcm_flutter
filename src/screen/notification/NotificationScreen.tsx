import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { ListLoadMore } from "components/ListLoadMore";
import { getDocumentInteractive, getNotifies, getUnNotifiesApi } from "services/api/apiProvider";
import { useDispatch, useSelector } from "react-redux";
import { currentUserStore } from "../../config/constants";
import React, { useCallback, useState } from "react";
import { FastImageCustom } from "components/FastImageCustom";
import FastImage from "react-native-fast-image";
import { dimensWidth } from "../../config/font";
import { format_dd_mm_yy, format_yy_mm_mm_dd_hh, getParameterUrlDoc, isNullOrEmpty } from "../../utils/function";
import { AppBarCustom } from "components/AppBarCustom";
import { DocumentInteractive } from "services/database/models/DocumentInteractive";
import NetInfo from "@react-native-community/netinfo";
import { goToDocumentDetail } from "navigation/goToDetailNavigation";
import ToggleHeader from "components/ToggleHeader";
import { getUnReadNotify } from "../../redux/dashboard/unreadReducer";
import HTML from "react-native-render-html";
import { decode } from 'html-entities';
import { SafeAreaView } from "react-native-safe-area-context";
import { Notify } from "services/database/models/Notify";


// @ts-ignore
export const NotificationScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    // @ts-ignore
    const { isConnected } = useSelector((state) => state.netInfo);
    const [index, setIndex] = useState(0);

    // @ts-ignore
    const itemRender = ({ item, index }) => {
        const windowWidth = useWindowDimensions().width;
        const customHTMLElementModels = {
            label: {
                contentModel: 'flow', // Set the content model as 'flow' or 'block' as appropriate
                isOpaque: true, // Set to true if this element contains its own children
            },
        };

        const parts = decode(langId == 1066 ? item.Content.replace(/<[^>]+>/g, '') : item.ContentEN.replace(/<[^>]+>/g, '')).split('""');
        const text = "dsadas "
        // @ts-ignore
        return <TouchableOpacity onPress={() => {
            goToDocumentDetail(navigation, item.Link, isConnected, false);
            // @ts-ignore
            setTimeout(() => dispatch(getUnReadNotify()), 1000);
        }}>
            <View
                style={{
                    backgroundColor: index % 2 === 0 ? '#F1FAFF' : 'white',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <FastImageCustom urlOnline={''}
                    defaultImage={require('assets/images/icon_list_notify.png')}
                    styleImg={{ height: 40, wight: 50, borderRadius: dimensWidth(0) }}
                    resizeMode={FastImage.resizeMode.stretch} />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <View style={{ marginLeft: -5 }}>
                        {parts.map((part, index) => (
                            <Text numberOfLines={2} key={index} style={part === "" ? styles.highlightedText : styles.normalText}>
                                <Text style={{ color: '#0C121D', fontWeight: '300' }}>
                                    {part.substring(0, part.indexOf('"'))}
                                    <Text style={{ color: '#0040A2' }}>
                                        {part.substring(part.indexOf('"'), part.lastIndexOf('"') + 1)}
                                    </Text>
                                    {part.substring(part.lastIndexOf('"') + 1)}
                                </Text>
                            </Text>
                        ))}
                    </View>
                    <Text >{item.Type}</Text>

                </View>
                {
                    !isNullOrEmpty(item.ActionTime) &&
                    (<View style={{ marginBottom: -40 }}>
                        <Text style={{ color: '#7B7B7B', fontSize: 12 }}>{format_yy_mm_mm_dd_hh(item.ActionTime)}</Text>
                    </View>)
                }
            </View>
        </TouchableOpacity>
    }
    const changeIndex = (index: number) => {
        setIndex(index)
    }
    const getData = useCallback(async (limit: number, offet: number, isOnline: any) => {
        if (isOnline) {
            let data;
            if (index == 0)
                data = await getNotifies(offet + "", limit + "");
            else
                data = await getUnNotifiesApi(offet + "", limit + "")
            if (data != null) {
                Notify.insertOrUpdateAll(data);
            }
            return data;
        }
        else {
            return Notify.getAll(index != 0);
        }
    }, [index])
    return <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <AppBarCustom onPress={null} navigation={navigation} title={currentTranslations.title_notification} RightControl={null} />
            <View style={{ width: '100%', height: 0.75, backgroundColor: 'grey' }} />



            <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ width: '80%', paddingTop: 10, paddingBottom: 10 }}>
                    <ToggleHeader changeIndex={changeIndex} text1={currentTranslations.all} text2={currentTranslations.unread}
                        styleContainer={styles.styleContainer} />
                </View>
            </View>
            <ListLoadMore key={index} numColumn={1} callData={getData} ItemRenderFlatlist={itemRender} limit={15} enableMoreData={true} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    styleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F3F7',
        padding: 5,
        borderRadius: 20
    },
    normalText: {
        color: '#0C121D',
        fontWeight: '300'
    },
    highlightedText: {
        color: '#0040A2',
        fontWeight: '800'

    },
})



