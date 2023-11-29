import DeviceInfo from 'react-native-device-info';
import messaging from "@react-native-firebase/messaging";
import { Platform, PlatformIOSStatic } from "react-native";

export async function getDeviceInfo() {
    const devicePushToken = await messaging().getToken();
    const deviceOS = Platform.OS === 'ios' ? (Platform as PlatformIOSStatic).isPad ? 4 : 2 : 1;

    return JSON.stringify({
        DeviceInfo: {
            AppVersion: DeviceInfo.getReadableVersion(),
            DeviceId: DeviceInfo.getDeviceId(),
            DeviceModel: DeviceInfo.getModel(),
            DeviceName: await DeviceInfo.getDeviceName(),
            DeviceOS: deviceOS,
            DeviceOSVersion: DeviceInfo.getSystemVersion(),
            DevicePushToken: devicePushToken,
        }
    });
}
