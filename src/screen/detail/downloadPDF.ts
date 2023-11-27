import {BASE_URL, subsiteStore} from "../../config/constants";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import RNFS from "react-native-fs"; // Import RNFetchBlob if you still need it

const downloadPDF = async (document:any,guid:any) => {
    try {
        const fileInfo = {
            Title: document.FileTitle,
            Url: document.FileUrl,
            ID: document.FileID,
        };

        const files = [fileInfo];

        const deviceInfo = {
            DeviceOS: DeviceInfo.getSystemName(),
            DeviceOSVersion: DeviceInfo.getSystemVersion(),
            DeviceModel: DeviceInfo.getModel(),
            DeviceName: '',
        };
        deviceInfo.DeviceName = await DeviceInfo.getDeviceName();
        const metaObj = {
            Title: document.Title,
            Description: '',
            ResourceUrl: document.Url,
            ResourceCategoryId: document.ResourceCategoryId,
            ResourcesubCategoryId: document.ResourceSubCategoryId,
            ResourceId: document.PrimaryKey,
            PostTime: new Date(),
            UserAgent: '',
            FlgUpdateData: 1,
            AppName: 'Mobile Android',
            Platform: `${deviceInfo.DeviceOS} ${deviceInfo.DeviceOSVersion}`,
            CodeName: deviceInfo.DeviceModel,
            DeviceName: deviceInfo.DeviceName,
            IP: '',
        };

        const encodedFiles = encodeURIComponent(JSON.stringify(files));
        const encodedMetaObj = encodeURIComponent(JSON.stringify(metaObj));

        const url =
            `/api/download.ashx?func=download` +
            `&tbl=documentattachfiles` +
            `&data=${encodedFiles}` +
            `&code=${document.Title.replace('_', '')}` +
            `&isarchive=${document.IsArchived > 0 ? String(document.IsArchived) : ''}` +
            `&byurl=1` +
            `&MetaObj=${encodedMetaObj}` +
            `&ispilot=${document.IsPilot ? '1' : '0'}`;

        const downloadURL = `https://vnadmsuatportal.vuthao.com/psd${url}`;
        const response = await axios.get(downloadURL, {
            responseType: 'arraybuffer',
        });
        console.log("response.request._response",response)
        const filePath = `${RNFS.DocumentDirectoryPath}/${guid}/myfile.pdf`;
        await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${guid}`);
        await RNFS.writeFile(filePath, response.request._response, 'base64');
        return filePath;
    } catch (error) {
        console.error(error);
        return  '';
    }
};

export default downloadPDF;
