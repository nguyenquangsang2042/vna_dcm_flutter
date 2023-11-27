import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {goToDocumentDetail} from "navigation/goToDetailNavigation";
import {FastImageCustom} from "components/FastImageCustom";
import {dimensWidth, windowWidth} from "../../config/font";
import FastImage from "react-native-fast-image";
import {format_dd_mm_yy, isNullOrEmpty} from "../../utils/function";
import {getDocumentFavoriteById, getListDocumentCategory, getStandardsByType} from "services/api/apiProvider";
import React, {useCallback, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {ListLoadMore} from "components/ListLoadMore";
import {DocumentCategory} from "services/database/models/DocumentCategory";
import {DocumentFavorite} from "services/database/models/DocumentFavorite";
import {currentUserStore} from "../../config/constants";
import {StandardDocDetail} from "services/database/models/StandardDocDetail";

export const ThumpDetailStandarDocScreen = () => {
    const navigation = useNavigation();
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    // @ts-ignore
    const {positionStayStandardDoc} = useSelector((state: RootState) => state.standard_doc);
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    // @ts-ignore
    const itemRender = ({item, index}) => {
        // @ts-ignore
        return <TouchableOpacity onPress={() => goToDocumentDetail(navigation, item.Url,isConnected,true)}>
            <View style={styles.gridItem}>
                <View style={styles.imageContainer}>
                    <FastImageCustom
                        urlOnline={item.Thumbnail}
                        defaultImage={require('assets/images/icon_document_default.png')}
                        styleImg={styles.image}
                        resizeMode={'stretch'}
                    />
                </View>
                <Text
                    style={styles.title}>{item.Title}</Text>
                {
                    !isNullOrEmpty(item.IssueDate) && (<View>
                        <Text>{format_dd_mm_yy(item.IssueDate)}</Text>
                    </View>)
                }
            </View>
        </TouchableOpacity>
    }
    const getData = async (limit: number, offet: number, isOnline:any) => {
        if (isOnline) {
            const data = await getStandardsByType(positionStayStandardDoc[positionStayStandardDoc.length-1].PrimaryKey,limit,offet,currentUserStore.getCurrentUser().ID,langId);
            if (data != null) {
                StandardDocDetail.insertOrUpdateAll(data);
            }
            return data;
        } else {
            return StandardDocDetail.getAll(positionStayStandardDoc[positionStayStandardDoc.length-1].PrimaryKey);
        }
    }
    const List = useCallback(() => {
        return <ListLoadMore numColumn={2} callData={getData} ItemRenderFlatlist={itemRender} enableMoreData={true}
                             limit={15}/>
    }, [positionStayStandardDoc])
    return <View style={styles.container}>
        <List/>
    </View>

}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        marginBottom:50
    },
    title: {
        color: 'black',
        fontFamily: 'heritage_regular',
        lineHeight: 15,
        marginTop: 10,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'heritage_regular',
        lineHeight: 15,
        marginTop: 10,
        textAlign: 'center',
        height: 50
    },
    gridItem: {
        width: windowWidth / 2,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    }, imageContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 150,
    },
    image: {
        marginLeft: 10,
        height: 200,
        width: 150,
        borderRadius: 0
    },
});
