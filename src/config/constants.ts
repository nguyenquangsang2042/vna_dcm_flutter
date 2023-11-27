import {Dimensions} from 'react-native';
const DEV_URL = 'https://vnadmsportal.vuthao.com';
const UAT_URL = 'https://vnadmsuatportal.vuthao.com';
const MIG_url = ''; /// UAT MIG
const LIVE_url = 'https://lib.vietnamairlines.com'; // LIVE
export const BaseSubSite='psd'
export const BASE_URL = LIVE_url;
export const subsiteStore = {
    subsite: BaseSubSite, // Initial value is an empty string

    getSubsite: function () {
        return this.subsite;
    },

    setSubsite: function (newSubsite: string) {
        this.subsite = newSubsite;
    },
};
export const currentUserStore = {
    currentUser: {
        ID:"",
        ImagePath: "",
        AccountName: "",
        FullName: "",
        DefaultLanguageid: 0,
        DepartmentTitle: "",
        DepartmentTitleEN: "",
        Email: "",
        Mobile: "",
        PositionTitleEN: "",
        PositionTitle: "",
        NotifyCategoryId:0,
        EmailCategoryId:0,
        TopUsedKey: "",
        DefaultSite:"",
        LastSite:""
    },
    getCurrentUser: function () {
        return this.currentUser;
    },
    setCurrentUser: function (newSubsite:any) {
        this.currentUser = newSubsite;
    },
};

export const RESONSE_STATUS_SUCCESS = 'SUCCESS';
export const RESONSE_STATUS_NONE = 'NONE';
export const RESONSE_STATUS_ERROR = 'ERR';
