import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextCusTom from 'components/TextCusTom'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {format_dd_mm_yy} from "../../../utils/function";
import {FontSize} from "../../../config/font";
import colors from "../../../config/colors";
import ThumbnailImage from "./ThumbnailImage";

const DocumentItem = ({gotoDetail, item}: any) => {
    const formatDate = format_dd_mm_yy(item?.IssueDate)
    return (
        <View style={styles.itemContainer}>
        <TouchableOpacity onPress={gotoDetail}>
            <ThumbnailImage urlOnline={item?.Thumbnail} styleImg={styles.imgThumbnail}/>
    </TouchableOpacity>
    <TextCusTom i18nKey={item?.Title} style={styles.cap1} numberOfLines={1}/>
    <TextCusTom i18nKey={formatDate} style={styles.cap1}/>
    </View>
)
}

export default DocumentItem

const styles = StyleSheet.create({
    itemContainer:{
        width: 160,
        height: 250,
        marginLeft: 20
    },
    imgThumbnail:{
        height: 200,
        width: 160
    },
    cap1:{
        fontSize: FontSize.SMALL,
        color: colors.text_grey26,
        fontWeight: '400',
        marginTop: 7,
        textAlign: 'center'
    }
})
