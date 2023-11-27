import {FlatList, StyleSheet, Switch, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {AppBarCustom} from "components/AppBarCustom";
import {useEffect, useState} from "react";
import {
    getConfigNotification,
    updateConfigureNotification
} from "services/api/apiProvider";
import {ConfigNotification} from "services/database/models/ConfigNotification";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";

// @ts-ignore
export const ConfigNotificationScreen = ({navigation}) => {
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);

    useEffect(() => {
        if(isConnected)
        {
            getConfigNotification().then(data => {
                setData(data?.data);
                setIsLoading(false);
                ConfigNotification.insertOrUpdateAll(data?.data);
            })
        }
        else{
            ConfigNotification.getAll().then(values=>{
                // @ts-ignore
                setData(values);
                setIsLoading(false);
            })
        }

    }, [isConnected]);


    // @ts-ignore
    const CustomItemConfig = ({Item1, Item2, Item3, styleContainer}) => {
        return <View style={[styles.container, styleContainer]}>
            <View style={styles.child1}>
                {Item1}
            </View>
            <View style={styles.child2}>
                {Item2}
            </View>
            <View style={styles.child3}>
                {Item3}
            </View>
        </View>;
    }
    // @ts-ignore
    const ItemRender = ({item, index}) => {
        const enableCheckNotify = (item.IsConfig & 1) > 0;
        const enableCheckGmail = (item.IsConfig & 2) > 0;
        const [checkNotify, setCheckNotify] = useState(item.NotifyChecked);
        const [checkEmail, setCheckEmail] = useState(item.EmailChecked);
        return <CustomItemConfig
            Item1={(<Text style={styles.textTitle}>{item.Title}</Text>)}
            Item2={(<Switch value={checkNotify} disabled={!enableCheckNotify}
                            trackColor={{false: "#767577", true: "#81b0ff"}}
                            thumbColor={checkNotify == 'en' ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={(value) => {
                                setCheckNotify(value);
                                // @ts-ignore
                                data[data.indexOf(item)].NotifyChecked=value;
                                ConfigNotification.insertOrUpdateAll([item]);
                                updateConfigureNotification(data);

                            }}/>)}
            Item3={(<Switch value={checkEmail} disabled={!enableCheckGmail}
                            trackColor={{false: "#767577", true: "#81b0ff"}}
                            thumbColor={checkEmail ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={(value) => {
                                setCheckEmail(value);
                                // @ts-ignore
                                data[data.indexOf(item)].EmailChecked=value;
                                ConfigNotification.insertOrUpdateAll([item]);
                                updateConfigureNotification(data);
                            }}/>)}
            styleContainer={{backgroundColor: index % 2 == 0 ? '#F1FAFF' : 'white'}}/>
    }
    return <SafeAreaView>
        <View>
        <AppBarCustom onPress={null} title={currentTranslations.configure_notification} navigation={navigation} RightControl={null}/>
        <CustomItemConfig Item1={(<View/>)} Item2={(<Text style={styles.textHeader}>Thông báo</Text>)} Item3={(<Text style={styles.textHeader}>Email</Text>)}
                          styleContainer={{backgroundColor: '#F2F3F7'}}/>
        {
            data != null && data.length > 0 && <FlatList
                data={data}
                // @ts-ignore
                keyExtractor={(item) => item.Rank.toString()} // Thay id bằng thuộc tính định danh của bạn
                renderItem={({item, index}) => (
                    <ItemRender item={item} index={index}/>
                )}
            />
        }
    </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    textHeader:{
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    textTitle:{
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'heritage_regular',
        lineHeight: 24,
        marginTop:5
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 50
    },
    child1: {
        flex: 6,
        justifyContent: 'center',
        marginLeft: 10,
    },
    child2: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    child3: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
