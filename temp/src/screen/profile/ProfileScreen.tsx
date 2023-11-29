import React, { useEffect, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { hideProfile } from "../../redux/profile/reducer";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FastImageCustom } from "components/FastImageCustom";
import { currentUserStore } from "../../config/constants";

export const ProfileScreen = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['90%'], []);
    const { isVisibleProfile } = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();

    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    useEffect(() => {
        // @ts-ignore
        if (Platform.OS !== 'ios') {
            // @ts-ignore
            bottomSheetRef.current.snapToPosition(0)
        }
    }, [isVisibleProfile]);
    const handleSheetChanges = (index: number) => {
        if (index == -1)
            dispatch(hideProfile());
    }
    return <BottomSheet
        ref={bottomSheetRef}
        index={isVisibleProfile ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        containerStyle={isVisibleProfile && styles.containerStyle}
        backgroundStyle={styles.bottomSheetStyle}
    >
        <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => {
                dispatch(hideProfile());
                if (Platform.OS === 'ios') {
                    // @ts-ignore
                    bottomSheetRef.current.snapToPosition(0)
                }
            }}>
                <Image
                    style={styles.image}
                    source={require('assets/images/icon_arrow.png')}
                    resizeMode="contain"
                    // @ts-ignore
                    transform={[{ rotate: '180deg' }]}
                />
            </TouchableOpacity>
            <Text style={styles.centeredText}>{currentTranslations.account}</Text>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                bottomSheetRef.current.snapToPosition(-1)
            }}>
                <Text style={styles.rightText}>{currentTranslations.close}</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.topTitle}>{currentTranslations.profile}</Text>
        <View style={[styles.line, { marginBottom: 20 }]} />
        <View style={styles.parentBorder}>
            <View style={styles.cardInfo}>
                <View style={styles.parentBorderContainer}>
                    <FastImageCustom urlOnline={currentUserStore.getCurrentUser().ImagePath} defaultImage={require('assets/images/img_avatar_grey.png')} />
                    <View style={styles.infor}>
                        <Text style={styles.fullname}>{currentUserStore.getCurrentUser().FullName}</Text>
                        <Text style={styles.accountname}>{currentUserStore.getCurrentUser().AccountName}</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={[styles.parentBorder, { marginTop: 30 }]}>
            <View style={styles.cardInfo}>
                <View style={[styles.infor, { padding: 10 }]}>
                    <Text style={styles.header}>Email</Text>
                    <Text style={styles.value}>{currentUserStore.getCurrentUser().Email}</Text>
                </View>
                <View style={styles.line} />
                <View style={[styles.infor, { padding: 10 }]}>
                    <Text style={styles.header}>{currentTranslations.phone}</Text>
                    <Text style={styles.value}>{currentUserStore.getCurrentUser().Mobile}</Text>
                </View>
                <View style={styles.line} />
                <View style={[styles.infor, { padding: 10 }]}>
                    <Text style={styles.header}>{currentTranslations.position}</Text>
                    <Text style={styles.value}>{currentLanguage == 'en' ? currentUserStore.getCurrentUser().PositionTitleEN : currentUserStore.getCurrentUser().PositionTitle}</Text>
                </View>
            </View>
        </View>

    </BottomSheet>
}
const styles = StyleSheet.create({
    header: {
        fontSize: 12,
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    value: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'heritage_regular',
        lineHeight: 15,

    },
    topTitle: {
        color: 'black',
        fontSize: 22,
        fontFamily: 'heritage_bold',
        marginLeft: 20,
        marginRight: 20
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#C0C0C0',
    },
    image: {
        height: 20,
        wight: 20,
    },
    accountname: {
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    fullname: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'heritage_regular',
        lineHeight: 20,
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
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    rightText: {
        textAlign: 'right',
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
});
