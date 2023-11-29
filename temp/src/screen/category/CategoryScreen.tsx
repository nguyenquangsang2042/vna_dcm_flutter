import {FlatList, ImageBackground, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {DocumentAreaCategory} from "services/database/models/DocumentAreaCategory";
import {currentUserStore} from "../../config/constants";
import {FastImageCustom} from "components/FastImageCustom";
import {getAllMasterData} from "services/api/apiProvider";
import {getModified, saveModified} from "../../utils/asyncStrorage";
import {FavoriteFolder} from "services/database/models/FavoriteFolder";
import {DocumentType} from "services/database/models/DocumentType";
import {addPositionStayCategory} from "../../redux/category/reducer";
import {useDispatch, useSelector} from "react-redux";
import {dimensWidth, windowWidth} from "../../config/font";
import FastImage from "react-native-fast-image";
import {setChildCategory} from "../../redux/app_bar_dasboard/reducer";
import {getCurrentTimeFormatted} from "../../utils/function";

export const CategoryScreen = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const currentLanguage = useSelector((state:any) => state.languages.currentLanguage);
    const {currentSite} = useSelector((state: any) => state.sub_site);
    const fetchData = () => {
        // Simulate fetching data from an API, replace with your actual data fetching logic
        DocumentAreaCategory.getParentCategories().then((values) => {
            // @ts-ignore
            setData(values);
            setRefreshing(false); // Stop the refreshing indicator
        });
    };

    useEffect(() => {
        fetchData();
    }, [currentLanguage,currentSite]);

    const onRefresh = async () => {
        setRefreshing(true); // Start the refreshing indicator
        getAllMasterData("DocumentAreaCategory,FavoriteFolder,DocumentType", await getModified()).then(values => {
            DocumentAreaCategory.insertOrUpdateAll(values.DocumentAreaCategory);
            FavoriteFolder.insertOrUpdateAll(values.FavoriteFolder);
            DocumentType.insertOrUpdateAll(values.DocumentType);
            saveModified(getCurrentTimeFormatted());
            fetchData(); // Fetch data again when refreshing
        });

    };

    return (
        <ImageBackground source={require('assets/images/background.png')} style={styles.imgBackground}>
            <FlatList
                style={{marginBottom: 50,paddingTop:25, width: '100%'}}
                data={data}
                numColumns={2}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => {
                        dispatch(setChildCategory(true))
                        dispatch(addPositionStayCategory(item))
                    }}>
                        <View style={styles.gridItem}>
                            <View style={styles.imageContainer}>
                                <FastImageCustom
                                    urlOnline={JSON.parse(item["Image"]).Path}
                                    defaultImage={require('assets/images/icon_thumbnail_category_default.png')}
                                    styleImg={styles.image}
                                />
                            </View>
                            <Text
                                style={styles.title}>{currentLanguage !== 'en' ? item["Title"] : item["TitleEN"]}</Text>
                            <Text style={styles.description} numberOfLines={2}>{item["Description"]}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={({PrimaryKey}) => {
                    return PrimaryKey;
                }}
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
        borderRadius:12
    },
    imgBackground: {
        height: '100%',
        width: "100%"
    },
    image: {
        marginLeft:10,
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
        height:50
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    gridItem: {
        width: windowWidth/2,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    centeredItem: {
        alignSelf: 'center',
    },
});
