import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
// @ts-ignore
import PushNotification, { Importance } from "react-native-push-notification";
import {Alert, Platform} from "react-native";
import  Firebase  from '@react-native-firebase/app';
import { FirebaseInit } from '../../../src/utils/function';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PushNotificationListener = () => {
    const chanel="VNA DCM";
   
    //add 13.10.2023 check for ios
    if (Platform.OS === 'ios')
    {
        FirebaseInit();
    }

    useEffect(() => {
        // Đăng ký để lắng nghe sự kiện push notification
        const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
            PushNotification.channelExists(chanel, function (exists: any) {
                if (!exists) {
                    PushNotification.createChannel(
                        {
                            channelId: chanel,
                            channelName: chanel,
                            channelDescription: chanel,
                            importance: Importance.HIGH,
                            vibrate: true,

                        }
                    );
                }
            });
            if (Platform.OS === 'android') {
                PushNotification.localNotification({
                    channelId: chanel,
                    channelName: chanel,
                    importance: Importance.HIGH,
                    vibrate: true,
                    message: remoteMessage.data.NotifyContent,
                    title:  remoteMessage.data.NotifyTitle,
                    showWhen: true,
                    when: new Date().getTime(),
                    invokeApp: true,
                    data: remoteMessage.data
                });
            }
            else {
                PushNotification.localNotification({
                    title: "a",
                    message: "a",
                    userInfo: "a",
                    invokeApp: true,
                });
            }
            console.log('Received a new push notification', JSON.stringify(remoteMessage));
        });

        // Hủy đăng ký listener khi component unmounts
        return unsubscribe;
    }, []);
    useEffect(() => {
        // Đăng ký để lắng nghe sự kiện push notification
        const unsubscribe = messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            PushNotification.channelExists('VNA DCM', function (exists: any) {
                if (!exists) {
                    PushNotification.createChannel(
                        {
                            channelId: 'VNA DCM',
                            channelName: 'VNA DCM',
                            channelDescription: 'VNA DCM',
                            importance: Importance.HIGH,
                            vibrate: true,

                        }
                    );
                }
            });
            if (Platform.OS === 'android') {
                PushNotification.localNotification({
                    channelId: chanel,
                    channelName: chanel,
                    importance: Importance.HIGH,
                    vibrate: true,
                    message: remoteMessage.data.NotifyContent,
                    title:  remoteMessage.data.NotifyTitle,
                    showWhen: true,
                    when: new Date().getTime(),
                    invokeApp: true,
                    data: remoteMessage.data
                });
            }
            else {
                PushNotification.localNotification({
                    title: "a",
                    message: "a",
                    userInfo: "a",
                    invokeApp: true,
                });
            }
            console.log('Received a new push notification', JSON.stringify(remoteMessage));
        });

        // Hủy đăng ký listener khi component unmounts
        return unsubscribe;
    }, []);
    useEffect(() => {
        const getPushToken = async () => {
            const token = await messaging().getToken();
            console.log('Push Token:', token);

        };
        getPushToken();
    }, []);
    return null; // Không cần render gì cả
};

