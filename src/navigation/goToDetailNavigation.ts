import {NavigationProp, useNavigation} from "@react-navigation/native";
import {getParameterUrlDoc, isValidUrl, openUrlInBrowser} from "../utils/function";
import {BASE_URL, subsiteStore} from "../config/constants";

export const goToDocumentDetail=(navigation: NavigationProp<ReactNavigation.RootParamList>,url:string,isConnect:boolean,isStandard:boolean)=>{
    let item;
    const params=getParameterUrlDoc(url);
    if(params.length>0)
    {
        item ={
            ResourceId:params[0],
            DocumentGroupId:params[1],
            CategoryId:params[2],
            IsStandard:isStandard
        }
    }
    else
    {
        const isValid=isValidUrl(url)
        if(isValid)
        {
            openUrlInBrowser(url);
        }
        else
        {
            if (url.indexOf(subsiteStore.getSubsite()) > 0) {
                url = BASE_URL + url;
            } else {
                url = BASE_URL + '/' + subsiteStore.getSubsite() + url;
            }
            url+="&Mobile=thachdepzai";
            item ={
                Url:url
            }
        }
    }
    // @ts-ignore
    item.isOffline=!isConnect;
    // @ts-ignore
    navigation.navigate('detail',{item});
}
