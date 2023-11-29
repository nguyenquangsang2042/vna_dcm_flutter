import {Text, TouchableOpacity, View} from "react-native";
import {goToDocumentDetail} from "navigation/goToDetailNavigation";
import {FastImageCustom} from "components/FastImageCustom";
import {dimensWidth} from "../../config/font";
import FastImage from "react-native-fast-image";
import {format_dd_mm_yy, isNullOrEmpty} from "../../utils/function";
import {getListDocumentCategory} from "services/api/apiProvider";
import React, {useCallback, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {ListLoadMore} from "components/ListLoadMore";
import {DocumentCategory} from "services/database/models/DocumentCategory";

export const ListDetailCategoryScreen = () => {
    const navigation = useNavigation();
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    const [change, setChange] = useState(false);
    // @ts-ignore
    const {positionStayCategory} = useSelector((state: RootState) => state.category);
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    // @ts-ignore
    const itemRender = ({item, index}) => {
        // @ts-ignore
        return <TouchableOpacity onPress={() => goToDocumentDetail(navigation, item.StorageCode,isConnected,false)}>
            <View
                style={{
                    backgroundColor: index % 2 == 0 ? '#F1FAFF' : 'white',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }}>
                <FastImageCustom urlOnline={item.Thumbnail}
                                 defaultImage={require('assets/images/icon_document_default.png')}
                                 styleImg={{height: 45, wight: 30, borderRadius: dimensWidth(0)}}
                                 resizeMode={FastImage.resizeMode.stretch}/>
                <View style={{flex: 1}}>
                    <Text style={{color: 'black'}}>{item.Title}</Text>
                    <Text>{item.Code}</Text>
                </View>
                {
                    !isNullOrEmpty(item.IssueDate) && (<View>
                        <Text>{format_dd_mm_yy(item.IssueDate)}</Text>
                    </View>)
                }
            </View>
        </TouchableOpacity>
    }
    const List = useCallback(() => {
        return <ListLoadMore numColumn={1} callData={getData} ItemRenderFlatlist={itemRender} enableMoreData={true}
                             limit={15}/>;
    }, [positionStayCategory])
    const getData = async (limit: number, offet: number, isOnline: any) => {
        if (isOnline) {
            const data = await getListDocumentCategory(langId, offet, limit, {
                "Parameters": {
                    "AreaCategoryId": positionStayCategory[positionStayCategory.length - 1].PrimaryKey,
                    "DocumentGroupId": "1",
                    "Title": "",
                    "Code": "",
                    "StorageCode": "",
                    "Int2": ""
                }
            });
            if (data != null) {
                DocumentCategory.insertOrUpdateAll(data);
            }
            return data;
        } else {
            return DocumentCategory.getAll(positionStayCategory[positionStayCategory.length - 1].PrimaryKey, limit, offet);
        }
    }
    return <View style={{
        flex: 1,
        marginBottom: 50
    }}>
        <List/>
    </View>
}
