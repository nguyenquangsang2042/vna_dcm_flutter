import {Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {ListLoadMore} from "components/ListLoadMore";
import {getComments, getDocumentInteractive} from "services/api/apiProvider";
import {useSelector} from "react-redux";
import {currentUserStore} from "../../config/constants";
import React from "react";
import {FastImageCustom} from "components/FastImageCustom";
import FastImage from "react-native-fast-image";
import {dimensWidth} from "../../config/font";
import {format_dd_mm_yy, getParameterUrlDoc, isNullOrEmpty} from "../../utils/function";
import {AppBarCustom} from "components/AppBarCustom";
import HTML from 'react-native-render-html';
import {Comment} from "services/database/models/Comment";
import {goToDocumentDetail} from "navigation/goToDetailNavigation";
import { SafeAreaView } from "react-native-safe-area-context";


// @ts-ignore
export const CommentsScreen = ({navigation}) => {
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    // @ts-ignore
    const itemRender = ({item, index}) => {
        const windowWidth = useWindowDimensions().width;
        const customHTMLElementModels = {
            label: {
                contentModel: 'flow', // Set the content model as 'flow' or 'block' as appropriate
                isOpaque: true, // Set to true if this element contains its own children
            },
        };
        // @ts-ignore
        return <TouchableOpacity onPress={() =>  goToDocumentDetail(navigation,item.ResourceUrl,isConnected,false)}>
            <View
                style={[{backgroundColor: index % 2 == 0 ? '#F1FAFF' : 'white'}, styles.root]}>
                <FastImageCustom urlOnline={item.Thumbnail}
                                 defaultImage={require('assets/images/icon_document_default.png')}
                                 styleImg={styles.img}
                                 resizeMode={FastImage.resizeMode.stretch}/>
                <View style={{flex: 1}}>
                    <Text style={styles.textTilte}>{item.Title}</Text>
                    <HTML source={{html: item.Content}} contentWidth={windowWidth}
                        // @ts-ignore
                          customHTMLElementModels={customHTMLElementModels}
                          ignoredDomTags={['label']}
                    />
                </View>
                <View>
                    {
                        !isNullOrEmpty(item.Created) && (<View>
                            <Text style={styles.textCreated}>{format_dd_mm_yy(item.Created)}</Text>
                        </View>)
                    }
                    {
                        !isNullOrEmpty(item.Status) && (<View style={{marginTop: 10}}>
                            <TextStatus item={item}/>
                        </View>)
                    }
                </View>
            </View>
        </TouchableOpacity>
    }
    // @ts-ignore
    const TextStatus = ({item}) => {
        const statusMap = {
            '-1': {backgroundColor: '#FFCDCD', text: currentTranslations.status_delete},
            '0': {backgroundColor: '#D1E9FF', text: currentTranslations.status_approving},
            '1': {backgroundColor: '#D1FDCE', text: currentTranslations.status_approved},
            default: {backgroundColor: '#FFCDCD', text: currentTranslations.status_refuse},
        };

        // @ts-ignore
        const statusInfo = statusMap[item.Status] || statusMap.default;

        return (
            <View style={{backgroundColor: statusInfo.backgroundColor, alignItems: 'center'}}>
                <Text style={styles.textStatus}>{statusInfo.text}</Text>
            </View>
        );
    };
    const getData = async (limit: number, offet: number, isOnline: any) => {
        if (isOnline) {
            const data = await getComments(offet, limit, {
                "Parameters": {
                    "CommentTitle": null,
                    "CommentStorageCode": null,
                    "CommentVersion": null,
                    "CommentDate": null,
                    "CommentIsApproved": null,
                    "CommentStatus": null
                }
            });
            if (data != null) {
                Comment.insertOrUpdateAll(data);
            }
            return data;
        } else {
            return Comment.getAll(limit, offet);
        }
    }
    return <SafeAreaView style={{height:'100%',width:'100%'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
        <AppBarCustom onPress={null} navigation={navigation} title={currentTranslations.list_comment} RightControl={null}/>
        <View style={{width: '100%', height: 0.75, backgroundColor: 'grey'}}/>
        <ListLoadMore numColumn={1} callData={getData} ItemRenderFlatlist={itemRender} enableMoreData={true} limit={15}/>
    </View>
    </SafeAreaView>
}
const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    img: {
        height: 45,
        wight: 30,
        borderRadius: dimensWidth(0)
    },
    textStatus: {
        marginTop: 5,
        paddingHorizontal: 10,
        color: 'black',
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    textTilte: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    textCreated: {
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    }
})

