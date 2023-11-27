import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    StyleSheet,
    TouchableOpacity, Image, Platform, Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/stores'
import {login} from '../../redux/login/loginReducer'
import {auth} from "../../redux/auth/reducer";
import {
    getModified,
    getPassword,
    getUsername,
    saveCredentials,
    saveCurrentUser,
    saveModified, saveSiteChangeType
} from "../../utils/asyncStrorage";
import {getCurrentTimeFormatted, isNullOrEmpty} from "../../utils/function";
import {
    callLogin,
    getAllMasterData,
    getCategoryDefine,
    getCurrentUser,
    getListSites,
    GetSettingsByKey
} from "services/api/apiProvider";
import {BaseSubSite, currentUserStore, subsiteStore} from "../../config/constants";
import NetInfo from "@react-native-community/netinfo";
import {DocumentAreaCategory} from "services/database/models/DocumentAreaCategory";
import {FavoriteFolder} from "services/database/models/FavoriteFolder";
import {DocumentType} from "services/database/models/DocumentType";
import {values} from "@nozbe/watermelondb/utils/fp";
import {SubSite} from "services/database/models/SubSite";
import {setSubSite} from "../../redux/subsite/reducer";
import {StandardDoc} from "services/database/models/StandardDoc";
import messaging from "@react-native-firebase/messaging";

function LoginScreen() {
    const dispatch = useDispatch();

    // @ts-ignore
    const {isAuth, isLoading, error} = useSelector((state: RootState) => state.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPass, setShowPass] = useState(false);
    // @ts-ignore
    const currentSite=useSelector((state)=>state.sub_site.currentSite);
    useEffect(() => {
        const showErr = async () => {
            const user = await getUsername();
            const pass = await getPassword();
            if (error != null && !isNullOrEmpty(user) && !isNullOrEmpty(pass)) {
                Alert.alert("Alert", "Unable to log in, please try again later");
            }
        }
        showErr();
    }, [error]);
    useEffect(() => {
        subsiteStore.setSubsite(currentSite);
        const reLogin = async () => {
            const connect = await NetInfo.fetch()
            if (connect.isConnected) {
                // @ts-ignore
                setUsername(await getUsername());
                // @ts-ignore
                setPassword(await getPassword());
                // @ts-ignore
                dispatch(login({username: await getUsername(), password: await getPassword()}));
            } else {
                getCurrentUser().then(user => {
                    currentUserStore.setCurrentUser(user);
                })
                dispatch(auth());
            }
        }
        reLogin();
    }, []);
    useEffect(() => {
        const checkAuth = async () => {
            const modified = await getModified();
            const getData=()=>{
                if(subsiteStore.getSubsite().includes("sqd"))
                {
                    getCategoryDefine().then(value=>{
                        StandardDoc.insertOrUpdateAll(value)
                    })
                }
                GetSettingsByKey("SiteChangeType").then(value=>{
                    if(value!=undefined && value!=null && value.length>0&& value[0].VALUE!=null)
                        saveSiteChangeType(value[0].VALUE)
                })
                getAllMasterData("DocumentAreaCategory,FavoriteFolder,DocumentType", modified).then(values => {
                    DocumentAreaCategory.insertOrUpdateAll(values.DocumentAreaCategory);
                    FavoriteFolder.insertOrUpdateAll(values.FavoriteFolder);
                    DocumentType.insertOrUpdateAll(values.DocumentType);
                    saveModified(getCurrentTimeFormatted());
                });
            }
            if (isAuth) {
                saveCredentials(username, password);
                getListSites(modified).then(value => {
                    SubSite.insertOrUpdateAll(value)
                })
                getCurrentUser().then(r => {
                    console.log("Default site", r.DefaultSite)
                    if (r.DefaultSite.includes(BaseSubSite)) {
                        currentUserStore.setCurrentUser(r);
                        saveCurrentUser(r);
                        dispatch(auth());
                        setTimeout(
                            async () => {
                                getData();
                            },
                            350
                        )
                    } else {
                        const lstSpitSite = r.DefaultSite.split('/');
                        dispatch(setSubSite(lstSpitSite[lstSpitSite.length - 1]))
                        callLogin(username, password).then(_ => {
                            getCurrentUser().then(r => {
                                console.log("Default site", r.DefaultSite)
                                currentUserStore.setCurrentUser(r);
                                saveCurrentUser(r);
                                dispatch(auth());
                                setTimeout(
                                    async () => {
                                        getData();
                                    },
                                    350
                                )
                            })
                        })
                    }
                });

            }
        }
        checkAuth();
    }, [isAuth, dispatch]);
    return (
        <ImageBackground
            source={require('../../assets/images/background_main.png')}
            style={styles.backgroundImage}>
            {(!isAuth && !isLoading) && (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.iconLeft} source={require('assets/images/icon_username.png')}/>
                        <TextInput
                            autoCapitalize="none"
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                        {username !== '' && (
                            <TouchableOpacity onPress={() => setUsername('')}>
                                <Image
                                    style={styles.iconRight}
                                    source={require('assets/images/icon_delete_text.png')}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.iconLeft} source={require('assets/images/icon_password.png')}/>
                        <TextInput
                            autoCapitalize="none"
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={!isShowPass}
                        />
                        {password !== '' && (
                            <TouchableOpacity onPress={() => setShowPass(!isShowPass)}>
                                <Image
                                    style={styles.iconRight}
                                    source={!isShowPass ? require('assets/images/icon_show_password.png') : require('assets/images/icon_unshow_password.png')}
                                />

                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            if (isNullOrEmpty(username) || isNullOrEmpty(password)) {
                                Alert.alert("Alert", "Username or password is blank. Please check again");
                            } else {
                                // @ts-ignore
                                dispatch(login({username, password}));
                            }
                        }}>
                        <Text style={styles.textLoginButton}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!isAuth && isLoading && (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Please wait....</Text>
                </View>
            )}
        </ImageBackground>
    );
}

export default React.memo(LoginScreen);
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Để căn giữa theo chiều dọc dưới cùng
        alignItems: 'center', // Để căn giữa theo chiều ngang
        marginBottom: 50, // Điều chỉnh khoảng cách dưới cùng
    },
    loadingText: {
        fontSize: 16,
        fontFamily: 'heritage_regular',
        lineHeight: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5, // Set the border radius to round the corners
        borderWidth: 1, // Add a border
        borderColor: '#E5E5E5', // Set the border color
        width: '80%',
        height: 40,
        marginBottom: 10

    },
    iconLeft: {
        marginLeft: 10,
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    iconRight: {
        marginRight: 10,
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    input: {
        flex: 1,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        backgroundColor: '#E6B441',
    },
    loading: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textLoginButton: {
        color: '#FFFFFF'
    }
});
