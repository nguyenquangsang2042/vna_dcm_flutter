import {currentUserStore, RESONSE_STATUS_SUCCESS, subsiteStore} from "../../config/constants";
import {get,post} from "services/api/apiClient";
import {isNullOrUndefined} from "../../utils/function";
import {getPassword, getUsername, saveCurrentUser} from "../../utils/asyncStrorage";
import {Document} from "services/database/models/Document";
import {getDeviceInfo} from "../../utils/deviceinfo";
import StandardDocDashBoard from "services/database/models/StandardDocDashBoard";

export const fetchAutoID = async () =>  {
    const subSite=subsiteStore.getSubsite();
    const res = await get(`/${subSite}/API/User.ashx?func=mobileAutoLoginWeb`);
    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                fetchAutoID();
            });
        }
    }
    else
    {
        return  null;
    }
};
export const callLogin=async (username:any, password:any)=>{
    const subSite=subsiteStore.getSubsite();
    let data = new FormData();
    const jsonData = {
        UserName: username,
        Password: password,
    };
    data.append('data', JSON.stringify(jsonData));
    const response=await post(
        `/${subSite}/api/ApiMobile.ashx?func=AdfsLogin`,
        data,
    );
    if (
        response.data.data != null &&
        response.data.data.includes('Login Success')
    ) {
        return response.data;
    } else {
        const response2 = await post(
            `/${subSite}/api/ApiMobile.ashx?func=AdfsLogin`,
            data,
        );
        if (
            response2.data.data != null &&
            response2.data.data.includes('Login Success')
        ) {
            return response2.data;
        } else {
            throw 101;
        }
    }
}
export const callUnReadNotify=async (Params: string, Offset: number, Limit: number, isCount: number) => {
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/API/ApiMobile.ashx?func=GetUnReadNotify&Params=${Params}&Offset=${Offset}&Limit=${Limit}&isCount=${isCount}`,
    );
    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                callUnReadNotify(Params,Offset,Limit,isCount);
            });
        }
    }
    else
    {
        return  null;
    }
}
export const  callDocumentNew=async (LangId: number, Params: string, Offset: number, Limit: number)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/API/ApiMobile.ashx?func=GetViewDocumentNew&LangId=${LangId}&Params=${Params}&Offset=${Offset}&Limit=${Limit}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            Document.insertOrUpdateAll(res.data.data)
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                callDocumentNew(LangId,Params,Offset,Limit);
            });
        }
    }
    else
    {
        return  null;
    }

}

export const  callStandardDoc=async (LangId: number, Params: string, Top: number)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetStandardsNew&LangId=1033&Top=5&Params=${Params}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            Document.insertOrUpdateAll(res.data.data);
            StandardDocDashBoard.insertOrUpdateAll(res.data.data);
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                callStandardDoc(LangId,Params,Top);
            });
        }
    }
    else
    {
        return  null;
    }

}

export const callDocumentMostView=async (LangId:number,Params:string,CategoryId:number,Offset:number,Limit:number)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/API/ApiMobile.ashx?func=GetDocumentMostView&LangId=${LangId}&Params=${Params}&CategoryId=${CategoryId}&Offset=${Offset}&Limit=${Limit}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            Document.insertOrUpdateAllMostViewed(res.data.data)
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                callDocumentMostView(LangId,Params,CategoryId,Offset,Limit);
            });
        }
    }
    else
    {
        return  null;
    }
}
export const callDocumentFavorite=async (LangId:number,Params:string,Offset:number,Limit:number)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/API/ApiMobile.ashx?func=GetDocumentFavorite&LangId=${LangId}&Params=${Params}&Offset=${Offset}&Limit=${Limit}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            Document.insertOrUpdateAllIsFavorite(res.data.data.Data)
            return res.data.data.Data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                callDocumentFavorite(LangId,Params,Offset,Limit);
            });
        }
    }
    else
    {
        return  null;
    }
}
export const getCurrentUser= async ()=>{
    const subSite=subsiteStore.getSubsite();
    let newData=new FormData();
    const device=await getDeviceInfo();
    newData.append("data",device);
    const res = await post(
        `/${subSite}/api/ApiMobile.ashx?func=CurrentUser`,newData
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data[0];
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getCurrentUser();
            });
        }
    }
    else
    {
        return  null;
    }

}
export const getDocumentInteractive = async (LangId:number,Params:string,Offset:number,Limit:number)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetInteractiveDocument&Params=${Params}&Limit=${Limit}&Offset=${Offset}&LangId=${LangId}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data.Data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getDocumentInteractive(LangId,Params,Offset,Limit);
            });
        }
        else {
            return null;
        }
    }
    else
    {
        return null;
    }
}

export const getComments = async (Offset:number,Limit:number,data:any)=>{
    const subSite=subsiteStore.getSubsite();
    let newData=new FormData();
    newData.append("data",JSON.stringify(data));
    const res = await post(
        `/${subSite}/api/ApiMobile.ashx?func=GetCommentByUser&Params=Offset,Limit&Limit=${Limit}&Offset=${Offset}`,
        newData
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data.Data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getComments(Offset,Limit,data);
            });
        }
        else {
            return null;
        }
    }
    else
    {
        return null;
    }
}
/**
 * lấy dữ liệu config notification từ server
 * @returns {string} - config notification
 */
export const getConfigNotification=async ()=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetConfigNotification`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            for (const configureNotification of res.data.data.Data)
            {
                res.data.data.Data[res.data.data.Data.indexOf(configureNotification)].NotifyChecked=getSettingNotify(configureNotification,res.data.data.MoreInfo[0]);
                res.data.data.Data[res.data.data.Data.indexOf(configureNotification)].EmailChecked=getSettingGmail(configureNotification,res.data.data.MoreInfo[0]);
            }
            return {
                data:res.data.data.Data,
                moreInfor:res.data.data.MoreInfo[0]
            };
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getConfigNotification();
            });
        }
    }
    else
    {
        return  null;
    }
}

export const updateConfigureNotification=async (configureNotificationList: any) => {
    const subSite=subsiteStore.getSubsite();
    let notifyCategoryId=0;
    let emailCategoryId=0
    for (const configureNotification of configureNotificationList) {
        console.log(" configureNotification.ID", configureNotification)
        if ((configureNotification.NotifyChecked != null && configureNotification.NotifyChecked)) {
            notifyCategoryId += configureNotification.ID;
        }
        if ((configureNotification.EmailChecked != null && configureNotification.EmailChecked)) {
            emailCategoryId += configureNotification.ID;
        }
    }
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=SaveUserConfigNotification&data={"Parameters":{"NotifyCategoryId":${notifyCategoryId},"EmailCategoryId":${emailCategoryId}}}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            currentUserStore.getCurrentUser().NotifyCategoryId=notifyCategoryId;
            currentUserStore.getCurrentUser().EmailCategoryId=emailCategoryId;
            saveCurrentUser(currentUserStore.getCurrentUser());
            return true;
        } else if (res.data.mess.Key == "998") {
            callLogin(await getUsername(), await getPassword()).then(_ => {
                getConfigNotification();
            });
        }
    } else {
        return false;
    }
}
export const getSettingNotify = (item: { ID: number; },moreInfo:any) => {
    if (moreInfo.NotifyCategoryId > 0) {
        return ((moreInfo.NotifyCategoryId & item.ID) > 0);
    } else {
        return true;
    }
}
export const getSettingGmail = (item: { ID: number; },moreInfo:any) => {
    if (moreInfo.EmailCategoryId > 0) {
        return ((moreInfo.EmailCategoryId & item.ID) > 0);
    } else {
        return true;
    }
}

export const getAllMasterData=async (beanName:string,modified:string)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=Get&Params=Modified&BeanName=${beanName}&Modified=${modified}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getConfigNotification();
            });
        }
    }
    else
    {
        return  null;
    }
}

export const getListDocumentCategory = async (LangId:number,Offset:number,Limit:number,data:any)=>{
    const subSite=subsiteStore.getSubsite();
    let newData=new FormData();
    newData.append("data",JSON.stringify(data));
    const res = await post(
        `/${subSite}/api/ApiMobile.ashx?func=SelectByArea&Params=LangId,Offset,Limit&LangId=${LangId}&Limit=${Limit}&Offset=${Offset}`,
        newData
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data.Data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getListDocumentCategory(LangId,Offset,Limit,data);
            });
        }
        else {
            return null;
        }
    }
    else
    {
        return null;
    }
}
export const getDocumentFavoriteById = async (id:string,limit:string,ofset:string)=>{
    const subSite=subsiteStore.getSubsite();
    let newData=new FormData();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetDocumentFavoriteById&Params=FolderId,Limit,Offset&FolderId=${id}&Limit=${limit}&Offset=${ofset}`
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data.Data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getDocumentFavoriteById(id,limit,ofset);
            });
        }
        else {
            return null;
        }
    }
    else
    {
        return null;
    }
}
export const getHTML=async (LCID:number, langid:number, data:any) => {

    const subSite=subsiteStore.getSubsite();
    let newData = new FormData();
    newData.append("data", JSON.stringify(data));
    const res = await post(
        `/${subSite}/api/detail.ashx?tbl=document&func=viewoffline&LCID=${LCID}&langid=${langid}`,
        newData
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            console.log("res.data.data",res.data.data)
            return res.data.data;
        } else if (res.data.mess.Key == "998") {
            callLogin(await getUsername(), await getPassword()).then(_ => {
                getHTML(LCID,langid,data)
            });
        } else {
            return null;
        }
    } else {
        return null;
    }
}
export const getDocumentById=async (DocumentId:string,LangId:number)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetDocumentById&Params=LangId,DocumentId&DocumentId=${DocumentId}&LangId=${LangId}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getDocumentById(DocumentId,LangId);
            });
        }
    }
    else
    {
        return  null;
    }
}

export const getNotifies=async (Offset:string,Limit:string)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetTopNotify&Params=Offset,Limit&Offset=${Offset}&Limit=${Limit}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data.Data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getNotifies(Offset,Offset);
            });
        }
    }
    else
    {
        return  null;
    }
}
export const getUnNotifiesApi=async (Offset:string,Limit:string)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetUnReadNotify&Params=Offset,Limit&Offset=${Offset}&Limit=${Limit}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data.Data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getUnNotifiesApi(Offset,Offset);
            });
        }
    }
    else
    {
        return  null;
    }
}
export const getListSites = async (modified:string)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/API/ApiMobile.ashx?func=GetListSites&Params=Modified&Modified=${modified}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getListSites(modified);
            });
        }
    }
    else
    {
        return  null;
    }
}
export const getCategoryDefine =async ()=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetCategoryDefine`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getCategoryDefine();
            });
        }
    }
    else
    {
        return  null;
    }
}
export const getStandardsByType =async (ID:number,Limit:number,Offset:number,UserId:string,LangId:number)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetStandardsByID&Params=ID,Limit,Offset,LangId&ID=${ID}&Limit=${Limit}&Offset=${Offset}&LangId=${LangId}`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                getStandardsByType(ID,Limit,Offset,UserId,LangId);
            });
        }
    }
    else
    {
        return  null;
    }
}
export const GetSettingsByKey =async (KeySetting:string)=>{
    const subSite=subsiteStore.getSubsite();
    const res = await get(
        `/${subSite}/api/ApiMobile.ashx?func=GetSettingsByKey&KeySetting=${KeySetting}&Params=KeySetting`,
    );

    if (!isNullOrUndefined(res)) {
        if (res.data.status === RESONSE_STATUS_SUCCESS) {
            return res.data.data;
        }
        else if(res.data.mess.Key=="998")
        {
            callLogin(await getUsername(),await getPassword()).then(_=>{
                GetSettingsByKey(KeySetting);
            });
        }
    }
    else
    {
        return  null;
    }
}



