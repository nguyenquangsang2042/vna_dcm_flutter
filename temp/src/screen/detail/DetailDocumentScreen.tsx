import {ActivityIndicator, Alert, BackHandler, StyleSheet, Switch, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {fetchAutoID, getDocumentById} from "services/api/apiProvider";
import {getCurrentTimeFormatted, isNullOrEmpty} from "../../utils/function";
import WebView from "react-native-webview";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BASE_URL, subsiteStore} from "../../config/constants";
import {DocumentType} from "services/database/models/DocumentType";
import {useDispatch, useSelector} from "react-redux";
import {AppBarCustom} from "components/AppBarCustom";
import {getDataViewDetailOffline} from "./getDataViewDetailOffline";
import {Document} from "services/database/models/Document";
import RNFS from "react-native-fs";
import DocumentOffline from "services/database/models/DocumentOffline";
import {DocumentPdfTypeScreen} from "./DocumentPdfTypeScreen";
import DocumentRecently from "services/database/models/DocumentRecently";
import {getRecentlyDoc} from "../../redux/dashboard/recentlyReducer";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailDocumentScreen = () => {
    const navigation = useNavigation();
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    const langId = currentLanguage === 'en' ? 1033 : 1066;

    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const route = useRoute();
    let url;
    // @ts-ignore
    const item = route.params.item;
    const [autoID, setAutoID] = useState('');
    const [documentType, setDocumentType] = useState();
    const [document, setDocument] = useState();
    const [isDownload, setIsDownload] = useState(false);
    const [isLoadingDownload, setIsLoadingDownload] = useState(false)
    const [documentOffline, setDocumentOffline] = useState();
    const dispatch=useDispatch();
    console.log("item data",item)
    if (item.Url == null) {
        if(!item.IsStandard)
            url = `${BASE_URL}/${subsiteStore.getSubsite()}/frontend/pages/VNADetailVB.aspx?rid=${item.ResourceId}&gid=1&cid=3&Mobile=1&autoid=${autoID}&lang=vi`
        else
            url = `${BASE_URL}/${subsiteStore.getSubsite()}/frontend/pages/VNAVbbnDetail.aspx?rid=${item.ResourceId}&gid=3&cid=${item.CategoryId}&Mobile=1&autoid=${autoID}&lang=vi`
    } else {
        url = item.Url;
    }
    console.log("url web",url)
    useEffect(() => {
       if(document!=undefined)
       {
           DocumentRecently.insertOrUpdateAll([
               {
                   documentID: document.DocumentId,
                   modified: getCurrentTimeFormatted()
               }
           ]);
           // @ts-ignore
           dispatch(getRecentlyDoc())
       }
    }, [document]);
    useEffect(() => {

        Document.getDocumentByDocumentID(item.ResourceId).then(
            value => {
                if(value.length>0)
                {
                    setDocument(value[0])
                }
                else {
                    getDocumentById(item.ResourceId,langId).then(value=>{
                        setDocument(value[0])
                        Document.insertOrUpdateAll(value)
                    })
                }
            }
        )
        DocumentOffline.getItemByID(item.ResourceId).then(value => {
            setIsDownload(value != null);
            setDocumentOffline(value);
        })
        if (!item.isOffline) {
            fetchAutoID().then(value => setAutoID(value))
        }
        DocumentType.getItem(item.CategoryId).then(value => {
            if (value.length > 0) {
                setDocumentType(value[0])
            }
        })
    }, []);
    const toggleOffline = () => {
        if (!item.isOffline) {
            return <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{
                    marginTop: 8,
                    fontSize: 16,
                    color: '#006885',
                    fontFamily: 'heritage_regular',
                    lineHeight: 20
                }}>{currentTranslations.ngo_i_tuy_n}</Text>
                {
                    !isLoadingDownload ?
                        <Switch value={isDownload} onValueChange={(value) => {
                            setIsDownload(value)
                            if (value) {
                                setIsLoadingDownload(true);
                                getDataViewDetailOffline(document, langId).then(value => {
                                    setIsDownload(value.status)
                                    Alert.alert(currentTranslations.title_notification, value.status ? currentTranslations.offline_enable : currentTranslations.offline_disable)
                                    setIsLoadingDownload(false);
                                    if (value.status) {
                                        DocumentOffline.insertOrUpdateAll([{
                                            documentID: item.ResourceId,
                                            modified: getCurrentTimeFormatted(),
                                            path: value.path
                                        }])
                                    }
                                });
                            } else {
                                Alert.alert(currentTranslations.title_notification, currentTranslations.offline_disable)
                                DocumentOffline.deleteByDocumentID(item.ResourceId)
                            }
                        }}/> :
                        <ActivityIndicator color={'blue'} size={25}/>
                }
            </View>;
        } else {
            return null;
        }
    }
    return (
        <View style={{flexDirection: 'column', flex: 1}}>
        <AppBarCustom onPress={null} navigation={navigation} title={""} RightControl={toggleOffline}/>
        {
            documentType !== undefined &&
            <View style={{padding: 15, backgroundColor: '#006885'}}>
                <Text style={{
                    marginTop: 10,
                    fontSize: 18,
                    color: 'white',
                    fontFamily: 'heritage_bold',
                    lineHeight: 20
                }}>{
                    currentTranslations.document_type} / {langId != 1033 ?
                    documentType["Title"] :
                    documentType["TitleEN"]
                }</Text>
            </View>
        }
        {!isNullOrEmpty(autoID) || (item.isOffline && documentOffline != undefined && document != undefined && (document.IsDivSection == 2
            || (document['IsDivSection'] == 1 && document['FileUrl'].endsWith("doc")) ||
            document['FileUrl'].endsWith("docx"))) ?
            <WebView
                setUseWideViewPort={true}
                javaScriptEnabled={true}
                allowFileAccess={true}
                originWhitelist={['*']}
                style={{width: '100%', height: '100%'}}
                // @ts-ignore
                source={{uri: item.isOffline ? documentOffline.path : url}}
                setSupportMultipleWindows={false}
                onShouldStartLoadWithRequest={request => {
                    if (request.url.includes('download.ashx?func=download&tbl=documentattachfiles&data=')) {
                        getDataViewDetailOffline(document, langId).then(value => {
                            setIsDownload(value.status)
                            Alert.alert(currentTranslations.title_notification, value.status ? currentTranslations.offline_enable : currentTranslations.offline_disable)
                            setIsLoadingDownload(false);
                            if (value.status) {
                                DocumentOffline.insertOrUpdateAll([{
                                    documentID: item.ResourceId,
                                    modified: getCurrentTimeFormatted(),
                                    path: value.path
                                }])
                            }
                        });
                        return false;
                    } else return true;
                }}
            /> : (
                item.isOffline && document != undefined && documentOffline != undefined ?
                    <DocumentPdfTypeScreen item={document} localPath={documentOffline["path"]}/> :
                    <View/>
            )
        }
    </View>
    );
}

const styles = StyleSheet.create(
    {}
);
export default React.memo(DetailDocumentScreen);

