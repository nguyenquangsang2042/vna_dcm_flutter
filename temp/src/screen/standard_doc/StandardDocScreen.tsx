import {FlatList, ImageBackground, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import { getCategoryDefine} from "services/api/apiProvider";
import { setChildStandardDoc} from "../../redux/app_bar_dasboard/reducer";
import {FastImageCustom} from "components/FastImageCustom";
import {windowWidth} from "../../config/font";
import {StandardDoc} from "services/database/models/StandardDoc";
import {addPositionStayStandardDoc} from "../../redux/standard_doc/reducer";

export const StandardDocScreen =()=> {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const {currentSite} = useSelector((state: any) => state.sub_site);
    const fetchData = () => {
        StandardDoc.getAll().then((values) => {
            // @ts-ignore
            setData(values);
            setRefreshing(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, [currentLanguage,currentSite]);

    const onRefresh = async () => {
        setRefreshing(true); // Start the refreshing indicator
        getCategoryDefine().then(value=>{
            StandardDoc.insertOrUpdateAll(value).then(_=>fetchData())
        })

    };

    return (
        <ImageBackground source={require('assets/images/background.png')} style={styles.imgBackground}>
            <FlatList
                style={{marginBottom: 50, paddingTop: 25, width: '100%'}}
                data={data}
                numColumns={2}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => {
                        dispatch(setChildStandardDoc(true))
                        dispatch(addPositionStayStandardDoc(item))
                    }}>
                        <View style={styles.gridItem}>
                            <View style={styles.imageContainer}>
                                <FastImageCustom
                                    defaultImage={require('assets/images/icon_folder_favorite.png')}
                                    styleImg={styles.image}
                                    urlOnline={''}
                                />
                            </View>
                        </View>
                        <Text style={{width:'100%',textAlign:'center'}}>
                            { item['Title']}
                        </Text>
                    </TouchableOpacity>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        padding: 10,
        backgroundColor: '#E2F9FF',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
        borderRadius: 12
    },
    imgBackground: {
        height: '100%',
        width: "100%"
    },
    image: {
        marginLeft: 10,
        height: 120,
        width: 120,
    },
    title: {
        color: 'black',
        fontFamily: 'heritage_regular',
        lineHeight: 15,
        marginTop: 10,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'heritage_regular',
        lineHeight: 15,
        marginTop: 10,
        textAlign: 'center',
        height: 50
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    gridItem: {
        width: windowWidth / 2,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    centeredItem: {
        alignSelf: 'center',
    },
});

