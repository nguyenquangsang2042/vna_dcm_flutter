import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCurrentTimeFormatted, isNullOrEmpty} from "./function";

export const saveCredentials = async (username: string, password: string) => {
    try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        if (__DEV__)
            console.log('Lưu thông tin thành công.');
    } catch (error) {
        if (__DEV__)
            console.error('Lỗi khi lưu thông tin:', error);
    }
};
export const getUsername = async () => {
    try {
        return await AsyncStorage.getItem('username');
    } catch (error) {
        console.error('Lỗi khi lấy thông tin:', error);
        return null;
    }
};

export const getPassword = async () => {
    try {
        return await AsyncStorage.getItem('password');
    } catch (error) {
        console.error('Lỗi khi lấy thông tin:', error);
        return null;
    }
};

export const saveCurrentUser=async (current_user:any) => {
    try {
        await AsyncStorage.setItem('current_user', JSON.stringify(current_user));
        console.log('Lưu thông tin thành công.');
    } catch (error) {
        console.error('Lỗi khi lưu thông tin:', error);
    }
}
export const getCurrentUser = async () => {
    try {
        const strCurrent=await AsyncStorage.getItem('current_user');
        return JSON.parse(<string>strCurrent);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin:', error);
        return null;
    }
};
export const saveModified=async (modified:string) => {
    try {
        await AsyncStorage.setItem('Modified',modified);
        console.log('Lưu thông tin thành công.');
    } catch (error) {
        console.error('Lỗi khi lưu thông tin: saveModified', error);
    }
}

export const getModified = async () => {
    try {
        const data=await AsyncStorage.getItem('Modified');
        return isNullOrEmpty(data)?"":data!;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin:', error);
        return "";
    }
};
export const saveSiteChangeType=async (modified:string) => {
    try {
        await AsyncStorage.setItem('SiteChangeType',modified);
        console.log('Lưu thông tin thành công SiteChangeType.');
    } catch (error) {
        console.error('Lỗi khi lưu thông tin: SiteChangeType', error);
    }
}
export const getSiteChangeType = async () => {
    try {
        const data=await AsyncStorage.getItem('SiteChangeType');
        return isNullOrEmpty(data)?"":data!;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin:SiteChangeType ', error);
        return "";
    }
};

