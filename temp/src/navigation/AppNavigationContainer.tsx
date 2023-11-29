import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from "react-redux";
import React from "react";
import {Button, View} from "react-native";
import {logout} from "../redux/auth/reducer";
import {re_init_state_login} from "../redux/login/loginReducer";
import {TabsScreen} from "../screen/tab/TabScreen";
import {changeLanguage} from "../redux/language/reducer";
import DetailDocumentScreen from "../screen/detail/DetailDocumentScreen";
import {NotificationScreen} from "../screen/notification/NotificationScreen";
import {InteractiveScreen} from "../screen/interactive/InteractiveScreen";
import {CommentsScreen} from "../screen/comments/CommentsScreen";
import {ConfigNotificationScreen} from "../screen/config_notification/ConfigNotificationScreen";
import {ListDocumentOffline} from "../screen/document_offline/ListDocumentOffline";
import {SearchResultScreen} from "../screen/search/SearchResultScreen";

const Stack = createStackNavigator();
export const AppNavigationContainer = () => {
    return (
        <Stack.Navigator initialRouteName="BottomNavigation">
            <Stack.Screen
                name="BottomNavigation"
                component={TabsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="detail"
                component={DetailDocumentScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="notification"
                component={NotificationScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="interactive"
                component={InteractiveScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="comment"
                component={CommentsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="config_notification"
                component={ConfigNotificationScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="list_documnet_offline"
                component={ListDocumentOffline}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="search_result"
                component={SearchResultScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="test"
                component={TestScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};
export const TestScreen = () => {
    const dis = useDispatch();
    return (<View style={{backgroundColor: 'yellow', flex: 1, alignItems: 'center', flexDirection: 'row'}}><Button
        title={'signout'} onPress={() => {
        // @ts-ignore
        dis(re_init_state_login());
        dis(logout());
    }}/></View>);
}
