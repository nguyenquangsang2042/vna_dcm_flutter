import LoginScreen from "../screen/login/LoginScreen";
import {AppNavigationContainer} from "./AppNavigationContainer";
import {useSelector} from "react-redux";
import {Platform, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export const AuthNavigation = () => {
    const isAuth = useSelector((state: any) => state.auth.isAuth);
    return (
        Platform.OS == "android" ?
            <View style={{flex: 1}}>{!isAuth ? <LoginScreen/> : <AppNavigationContainer/>}</View>
            :
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                marginBottom: 0,
                marginTop: 35
            }}>
                <View style={{flex: 1}}>{!isAuth ? <LoginScreen/> : <AppNavigationContainer/>}</View>
            </SafeAreaView>
    );
};
