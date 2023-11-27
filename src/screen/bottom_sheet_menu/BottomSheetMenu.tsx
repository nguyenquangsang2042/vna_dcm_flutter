import React, {useRef, useMemo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet from "@gorhom/bottom-sheet";
import {Alert, Platform, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {hideBottomSheet, showBottomSheet} from "../../redux/bottom_sheet/reducer";
import {FastImageCustom} from "components/FastImageCustom";
import {BaseSubSite, currentUserStore} from "../../config/constants";
import ItemMenuBottom from "./component/ItemMenuBottom";
import ArrowIcon from "components/ArrowIcon";
import {re_init_state_login} from "../../redux/login/loginReducer";
import {logout} from "../../redux/auth/reducer";
import {saveCredentials, saveModified} from "../../utils/asyncStrorage";
import {useNavigation} from "@react-navigation/native";
import {changeLanguage} from "../../redux/language/reducer";
import DeviceInfo from "react-native-device-info";
import {hideProfile, showProfile} from "../../redux/profile/reducer";
import {Comment} from "services/database/models/Comment";
import {ConfigNotification} from "services/database/models/ConfigNotification";
import {Document} from "services/database/models/Document";
import {DocumentAreaCategory} from "services/database/models/DocumentAreaCategory";
import {DocumentCategory} from "services/database/models/DocumentCategory";
import {DocumentFavorite} from "services/database/models/DocumentFavorite";
import {DocumentInteractive} from "services/database/models/DocumentInteractive";
import DocumentOffline from "services/database/models/DocumentOffline";
import DocumentRecently from "services/database/models/DocumentRecently";
import {DocumentType} from 'services/database/models/DocumentType';
import {FavoriteFolder} from "services/database/models/FavoriteFolder";
import {SearchHistory} from "services/database/models/SearchHistory";
import {resetStateNewList} from "../../redux/dashboard/documentNewReducer";
import {resetStateFavoriteList} from "../../redux/dashboard/favoriteReducer";
import {resetStateMostViewList} from "../../redux/dashboard/mostViewReducer";
import {resetStateRecentlyViewedDocument} from "../../redux/dashboard/recentlyReducer";
import {hideSubSite, setSubSite, showSubSite} from "../../redux/subsite/reducer";
import {SubSite} from "services/database/models/SubSite";
import CustomSwitch from 'components/CustomSwitch';

export const BottomSheetMenu = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['90%'], []);
    const {isVisible} = useSelector((state: any) => state.bottomSheet);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    const langId = currentLanguage === 'en' ? 1033 : 1066;

    // @ts-ignore
    const defaultSubSite = useSelector((state) => state.sub_site);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    // @ts-ignore
    const currentSite = useSelector((state) => state.sub_site.currentSite);
    const [TitleSubSite, setTitleSubSite] = useState();
    useEffect(() => {
        SubSite.getBySubSite(currentSite).then(value => {
            console.log("cr", value);
            if (value != null || value != undefined)
                // @ts-ignore
                setTitleSubSite(value)
        })
    }, [currentSite]);
    useEffect(() => {
        // @ts-ignore
        bottomSheetRef.current.snapToPosition(0)
    }, [isVisible]);
    const handleSheetChanges = (index: number) => {
        if (index == -1)
            dispatch(hideBottomSheet());
    }


      //add check Switch Languages for IOS 6.11.2023
      const onSelectSwitch = useCallback(
        (languages: string) => {
            dispatch(changeLanguage(currentLanguage == 'en' ? 'vi' : 'en'))
               // bottomSheetRef.current.snapToPosition(-1)
        },
        [currentLanguage],
    );
    const [isIOS, setIOS] = useState(false);
    const [isLangueEn, setIsLangueEn] = useState(false);
    const [isLangueVN, setIsLangueVN] = useState(false);
    useEffect(() => {
        if (currentLanguage === 'en') {
            setIsLangueEn(true);
            setIsLangueVN(false);
        } else {
            setIsLangueVN(true);
            setIsLangueEn(false);
        }
    }, [currentLanguage]);

    if (Platform.OS === 'ios') {
        useEffect(() => {
            setIOS(true);
        }, []);
    }
    const onLogout = useCallback(() => {
        Alert.alert('VNA DCM', 'Bạn có chắc chắn muốn đăng xuất không ?', [
            { text: 'Đăng xuất', onPress: () => signOut() },
          {
            text: 'Hủy',
            style: 'cancel'
          },
     
        ])
      }, []);
    const signOut = async () => {
        saveCredentials("", "");
        saveModified("");
        changeSite();
      }
    
    // ...


    const changeSite=()=>{
        Comment.deleteAll();
        ConfigNotification.deleteAll();
        Document.deleteAll();
        DocumentAreaCategory.deleteAll();
        DocumentCategory.deleteAll();
        DocumentFavorite.deleteAll();
        DocumentInteractive.deleteAll();
        DocumentOffline.deleteAll();
        DocumentRecently.deleteAll();
        DocumentType.deleteAll();
        FavoriteFolder.deleteAll();
        SearchHistory.deleteAll();
        dispatch(hideBottomSheet());
        dispatch(hideProfile());
        dispatch(hideSubSite());
        dispatch(resetStateNewList());
        dispatch(resetStateFavoriteList());
        dispatch(resetStateMostViewList());
        dispatch(resetStateRecentlyViewedDocument());
        dispatch(hideBottomSheet());
        dispatch(setSubSite(BaseSubSite));
        // @ts-ignore
        dispatch(re_init_state_login());
        dispatch(logout());
    }
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={isVisible ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            containerStyle={isVisible && styles.containerStyle}
            backgroundStyle={styles.bottomSheetStyle}
        >
            <View style={styles.topContainer}>
                <Text style={styles.leftText}>Đóng</Text>
                <Text style={styles.centeredText}>{currentTranslations.account}</Text>
                <TouchableOpacity onPress={() => {
                    // @ts-ignore
                    bottomSheetRef.current.snapToPosition(-1)
                }}>
                    <Text style={styles.rightText}>{currentTranslations.close}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
                dispatch(showProfile());
            }}>
                <View style={styles.parentBorder}>
                    <View style={styles.cardInfo}>
                        <View style={styles.parentBorderContainer}>
                            <FastImageCustom urlOnline={currentUserStore.getCurrentUser().ImagePath}
                                             defaultImage={require('assets/images/img_avatar_grey.png')}/>
                            <View style={styles.infor}>
                                <Text style={styles.fullname}>{currentUserStore.getCurrentUser().FullName}</Text>
                                <Text style={styles.accountname}>{currentUserStore.getCurrentUser().AccountName}</Text>
                            </View>
                        </View>
                        {
                            TitleSubSite != undefined && <TouchableOpacity onPress={()=>{
                                dispatch(showSubSite());
                            }}>
                                <View style={styles.containerDepartmentTitle}>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textDepartmentTitle}>{
                                        langId == 1066 ?
                                            TitleSubSite[0]['Title'] :
                                            TitleSubSite[0]['TitleEN']
                                    }
                                    </Text>
                                    <ArrowIcon/>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.parentBorder}>
                <View style={[styles.cardDoc]}>
                    <ItemMenuBottom onPress={() => {
                        // @ts-ignore
                        navigation.navigate('interactive');
                    }} pathImageLeft={require('assets/images/icon_interact.png')}
                                    showLine={false}
                                    text={currentTranslations.interactive_document}
                                    textColor={'black'}
                                    rightView={<ArrowIcon/>}
                    />
                    <ItemMenuBottom onPress={() => {
                        // @ts-ignore
                        navigation.navigate('comment');
                    }} pathImageLeft={require('assets/images/icon_comment.png')}
                                    showLine={false}
                                    text={currentTranslations.list_comment}
                                    textColor={'black'}
                                    rightView={<ArrowIcon/>}
                    />
                    <ItemMenuBottom onPress={() => {
                        // @ts-ignore
                        navigation.navigate('list_documnet_offline');
                    }} pathImageLeft={require('assets/images/ic_vbnt.png')}
                                    showLine={false}
                                    text={currentTranslations.text_offline}
                                    textColor={'black'}
                                    rightView={<ArrowIcon/>}

                    />
                </View>
            </View>
            <View style={styles.parentBorder}>
                <View style={[styles.cardDoc]}>
                    <ItemMenuBottom onPress={() => {
                        // @ts-ignore
                        navigation.navigate('config_notification');
                    }} pathImageLeft={require('assets/images/icon_setting.png')}
                                    showLine={false}
                                    text={currentTranslations.configure_notification}
                                    textColor={'black'}
                                    rightView={<ArrowIcon/>}
                    />
                    <ItemMenuBottom onPress={null} pathImageLeft={require('assets/images/icon_language.png')}
                                    showLine={false}
                                    text={currentTranslations.language} textColor={'black'}
                                    rightView={
                                    
                                        <View>
                                        {Platform.OS === 'ios' ? (
                                            <CustomSwitch
                                                isLangueEn={isLangueEn}
                                                isLangueVi={isLangueVN}
                                                roundCorner={true}
                                                option1={'EN'}
                                                option2={'VN'}
                                                onSelectSwitch={onSelectSwitch}
                                                selectionColor={'#DBA410'}
                                            />
                                        ) : (
                                            <Switch
                                                value={currentLanguage == 'en'}
                                                onValueChange={() => {
                                                    // @ts-ignore
                                                    bottomSheetRef.current.snapToPosition(-1);
                                                    dispatch(changeLanguage(currentLanguage == 'en' ? 'vi' : 'en'));
                                                }}
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={currentLanguage == 'en' ? "#f4f3f4" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                            />
                                        )}
                                    </View>
                                
                                }
                    />
                    <ItemMenuBottom onPress={null} pathImageLeft={require('assets/images/icon_version.png')}
                                    showLine={false}
                                    text={currentTranslations.version} textColor={'black'}
                                    rightView={<Text style={styles.version}>{DeviceInfo.getReadableVersion()}</Text>}
                    />

                </View>
            </View>
            <View style={styles.parentBorder}>
                <View style={[styles.cardDoc]}>
                    <ItemMenuBottom onPress={() => {
                            onLogout()
                        // saveCredentials("", "");
                        // saveModified("");
                        // changeSite();
                    }} pathImageLeft={require('assets/images/icon_logout.png')}
                                    showLine={false}
                                    text={currentTranslations.logout}
                                    textColor={'red'}
                                    rightView={null}
                    />
                </View>
            </View>
        </BottomSheet>
    );
};
const styles = StyleSheet.create({
    version: {
        color: "#2376E0"
    },
    textDepartmentTitle: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'heritage_regular',
        lineHeight: 20,
        marginTop:5,
        width:'95%'
    },
    containerDepartmentTitle: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 6,
        borderColor: '#00688540',
        borderWidth: 1,
        flexDirection:'row'
    },
    accountname: {
        fontFamily: 'heritage_regular',
        lineHeight: 24,
    },
    fullname: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'heritage_regular',
        lineHeight: 24,
    },
    infor: {
        flexDirection: 'column'
    },
    parentBorder: {
        alignItems: 'center'
    },
    cardDoc: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        width: "90%",
        marginTop: 25
    },
    cardInfo: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        width: "90%",
    },
    parentBorderContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
    },

    containerStyle: {
        backgroundColor: 'rgba(128, 128, 128, 0.6)'
    },
    bottomSheetStyle: {
        backgroundColor: '#F2F3F7',
        borderRadius: 12
    },
    topContainer: {
        flexDirection: 'row', // Arrange children in a row
        alignItems: 'center', // Center vertically
        padding: 16,
    },
    centeredText: {
        flex: 1,
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'heritage_bold',
        lineHeight: 24,
    },
    rightText: {
        textAlign: 'right',
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    leftText: {
        textAlign: 'right',
        color: 'transparent'
    },
});
