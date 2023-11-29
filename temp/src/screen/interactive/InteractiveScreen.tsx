import {Image, Text, TouchableOpacity, View} from "react-native";
import {ListLoadMore} from "components/ListLoadMore";
import {getDocumentInteractive} from "services/api/apiProvider";
import {useSelector} from "react-redux";
import {currentUserStore} from "../../config/constants";
import React from "react";
import {FastImageCustom} from "components/FastImageCustom";
import FastImage from "react-native-fast-image";
import {dimensWidth} from "../../config/font";
import {format_dd_mm_yy, getParameterUrlDoc, isNullOrEmpty} from "../../utils/function";
import {AppBarCustom} from "components/AppBarCustom";
import {DocumentInteractive} from "services/database/models/DocumentInteractive";
import NetInfo from "@react-native-community/netinfo";
import {goToDocumentDetail} from "navigation/goToDetailNavigation";
import { SafeAreaView } from "react-native-safe-area-context";


// @ts-ignore
export const InteractiveScreen = ({navigation}) => {
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const langId = currentLanguage === 'en' ? 1033 : 1066;
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    // @ts-ignore
    const itemRender = ({item, index}) => {
        // @ts-ignore
        return <TouchableOpacity onPress={() => goToDocumentDetail(navigation,item.ResourceUrl,isConnected,false)}>
            <View
                style={{backgroundColor: index % 2 == 0 ? '#F1FAFF' : 'white', flexDirection: 'row', width: '100%', paddingHorizontal: 20, paddingVertical: 10}}>
                <FastImageCustom urlOnline={item.Thumbnail}
                                 defaultImage={require('assets/images/icon_document_default.png')}
                                 styleImg={{height: 45, wight: 30, borderRadius: dimensWidth(0)}}
                                 resizeMode={FastImage.resizeMode.stretch}/>
                <View style={{flex: 1}}>
                    <Text>{item.Title}</Text>
                    <Text>{item.Type}</Text>
                </View>
                {
                    !isNullOrEmpty(item.Created)&&(<View>
                        <Text>{format_dd_mm_yy(item.Created)}</Text>
                    </View>)
                }
            </View>
        </TouchableOpacity>
    }
    const getData = async (limit: number, offet: number, isOnline: any) => {
        if(isOnline)
        {
            const data = await getDocumentInteractive(langId, "Offset,Limit,LangId", offet, limit);
            if(data !=null)
            {
                DocumentInteractive.insertOrUpdateAll(data);
            }
            return data;
        }
        else
        {
            return DocumentInteractive.getAll(limit,offet);
        }
    }
    return <View style={{height:'100%',width:'100%'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
        <AppBarCustom onPress={null} navigation={navigation} title={currentTranslations.interactive_document} RightControl={null}/>
        <View style={{width:'100%',height:0.75,backgroundColor:'grey'}}/>
        <ListLoadMore numColumn={1} callData={getData} ItemRenderFlatlist={itemRender} limit={15} enableMoreData={true}/>
    </View>
    </View>
}

