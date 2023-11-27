import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import React, {useCallback, useState} from "react";
import {goToDocumentDetail} from "navigation/goToDetailNavigation";
import {FastImageCustom} from "components/FastImageCustom";
import {dimensWidth} from "../../config/font";
import FastImage from "react-native-fast-image";
import {format_dd_mm_yy, isNullOrEmpty} from "../../utils/function";
import {ListLoadMore} from "components/ListLoadMore";
import {getListDocumentCategory, getStandardsByType} from "services/api/apiProvider";
import {DocumentCategory} from "services/database/models/DocumentCategory";
import {currentUserStore} from "../../config/constants";
import {StandardDocDetail} from "services/database/models/StandardDocDetail";

export const ListDetailStandardDocScreen=()=>{
    const navigation = useNavigation();
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    const [change, setChange] = useState(false);
    // @ts-ignore
    const {positionStayStandardDoc} = useSelector((state: RootState) => state.standard_doc);
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    // @ts-ignore
    const itemRender = ({item, index}) => {
        // @ts-ignore
        return <TouchableOpacity onPress={() => goToDocumentDetail(navigation, item.Url,isConnected,true)}>
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
    }, [positionStayStandardDoc])
    const getData = async (limit: number, offet: number, isOnline: any) => {
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
    return <View style={{
        flex: 1,
        marginBottom: 50
    }}>
        <List/>
    </View>
}
