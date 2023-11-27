import moment from 'moment';
import {Linking} from "react-native";
import messaging, { firebase }  from '@react-native-firebase/messaging';
import { BASE_URL } from '../../src/config/constants';
export const removeSpecialCharacters = (str: string) => {
    if (!str) {
        return '';
    }
    if (str.includes(';#')) {
        const separator = ';#';
        return str.split(separator)[1];
    } else {
        return str;
    }
};
export const removeVietnameseDiacritics=(str:string)=> {
    // Chuyển chuỗi thành chuỗi không dấu
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return str;
}
export const removeNumbersAndHashes = (str: string) => {
    if (!str) {
        return '';
    }
    // Remove numbers
    str = str.replace(/\d+/g, '');

    // Remove '#'
    str = str.replace(/#/g, '');

    // Remove extra semicolons
    str = str.replace(/;;/g, ';');

    // Remove leading and trailing semicolons
    str = str.replace(/(^;)|(;$)/g, '');

    return str;
};

export const format_dd_mm_yyyy_hh_mm = (date: moment.MomentInput) => {
    if (isNullOrUndefined(date)) {
        return '';
    }
    return moment(date).format('DD/MM/YYYY HH:mm');
};
export const format_dd_mm_yy = (date: moment.MomentInput) => {
    return date ? moment(date).format('DD/MM/YYYY') : '';
};
export const format_mm_dd_yy = (date: moment.MomentInput) => {
    return moment(date).format('MM/DD/YYYY');
};
export const format_mm_dd_hh_yy_mm_ss = (date: moment.MomentInput) => {
    return moment(date).format('MM/DD/YYYY HH:mm:ss');
};
export const format_yy_mm_mm_dd_hh = (date: moment.MomentInput) => {
    return moment(date).format('HH:mm DD/MM/YYYY');
};
export const formatDate = (date: moment.MomentInput, format: string | undefined) => {
    return moment(date).format(format);
};

export const format_yy_mm_dd = 'YYYY-MM-DD';
export const arrayIsEmpty = (array: string | any[]) => {
    if (!Array.isArray(array)) {
        return true;
    }
    if (array.length === 0) {
        return true;
    }
    return false;
};
export const checkIsEmpty = (text: string | any[] | null | undefined) => {
    if (text?.length === 0 || text === undefined || text === null) {
        return true;
    }
    return false;
};
export function checkIsBefore(date1: moment.MomentInput, date2: moment.MomentInput) {
    return moment(date1).isBefore(date2);
}
export function checkIsAfter(date1: moment.MomentInput, date2: moment.MomentInput) {
    return moment(date1).isAfter(date2);
}

export function getExtension(filename: string) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

export const splitID = (text: string) => {
    return text?.split(';')[0];
};

export const isNullOrUndefined = (data:any) => {
    return data === null || data === '' || data === undefined;
};

export const isNullOrEmpty = (text: string | null|{}) => {
    return text === null || text === '';
};

export const checkNotNullAndEmpty = (text: string | any[] | null) => {
    if (text?.length !== 0 && text !== null) {
        return true;
    }
    return false;
};

export function byteConverter(bytes: number, decimals: number | undefined, only: string) {
    const K_UNIT = 1024;
    const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    if (bytes == 0) {
        return '0 Byte';
    }

    if (only === 'MB') {
        return (bytes / (K_UNIT * K_UNIT)).toFixed(decimals) + ' MB';
    }

    let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
    let resp =
        parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) +
        ' ' +
        SIZES[i];

    return resp;
}

export const VersionCompare = (version1: string, version2: string) => {
    var regExStrip0 = /(\.0+)+$/;
    var segmentsA = version1.replace(regExStrip0, '').split('.');
    var segmentsB = version2.replace(regExStrip0, '').split('.');

    if (segmentsA > segmentsB) {
        return 1;
    } else if (segmentsA < segmentsB) {
        return -1;
    } else {
        return 0;
    }
};
export const getCurrentTimeFormatted=()=> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export const  isValidUrl=(url:string)=> {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
}
export const openUrlInBrowser=(url:string)=> {
    if (isValidUrl(url)) {
        Linking.openURL(url)
            .then(() => {
                console.log(`Opened URL: ${url}`);
            })
            .catch((err) => {
                console.error(`Error opening URL: ${url}`, err);
            });
    } else {
        console.error(`Invalid URL: ${url}`);
    }
}
export const getParameterUrlDoc=(url: string)=> {
    const retValue: number[] = [];
    if (url && url.indexOf(".html") > 0) {
        url = url.substring(0, url.indexOf(".html"));

        if (url) {
            const arrs: string[] = url.split("/");
            if (arrs.length > 2) {
                let end: string[] = arrs[arrs.length - 1].split("-");
                const mResourceId: number = parseInt(end[end.length - 1]);

                end = arrs[arrs.length - 2].split("-");
                const mCategoryId: number = parseInt(end[end.length - 1]);

                retValue.push(mResourceId);
                retValue.push(1);
                retValue.push(mCategoryId);
            }
        }
    }
    return retValue;
}

//Check for IOS
export const FirebaseInit= () => {
    const firebaseConfig = {
        // clientId: 'YOUR_CLIENT_ID',
        appId: 'AIzaSyCSJ6TL1CoX9hNNLjiXPICXqtXqCJ5fH6o',
        authDomain:BASE_URL,
        apiKey: 'AIzaSyCSJ6TL1CoX9hNNLjiXPICXqtXqCJ5fH6o',
        databaseURL: 'YOUR_DATABASE_URL',
        storageBucket: 'vna-lib.appspot.com',
        messagingSenderId: '1011782543796',
        projectId: 'vna-lib',
      };
      firebase.initializeApp(firebaseConfig);
}