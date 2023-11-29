import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/stores";
import {useEffect} from "react";
import {BackHandler, Image, Platform} from "react-native";
import {TestScreen} from "navigation/AppNavigationContainer";
import DashboardScreen from "../screen/dashboard/DashboardScreen";
import {CategoryScreen} from "../screen/category/CategoryScreen";
import {RootCategoryScreen} from "../screen/category/RootCategoryScreen";
import {getDocumentFavorite} from "../redux/dashboard/favoriteReducer";
import {getDocumentMostView} from "../redux/dashboard/mostViewReducer";
import {getRecentlyDoc} from "../redux/dashboard/recentlyReducer";
import {getUnReadNotify} from "../redux/dashboard/unreadReducer";
import {getViewDocumentNew} from "../redux/dashboard/documentNewReducer";
import {
    setChildCategory,
    setChildFavorite,
    setChildStandardDoc,
    setHomePageState,
    setIndexTab
} from "../redux/app_bar_dasboard/reducer";
import {changeColumnFlatList} from "../redux/list_load_more/reducer";
import {removeAllPositionStayCategory} from "../redux/category/reducer";
import {SearchScreen} from "../screen/search/SearchScreen";
import {setSearchTerm} from "../redux/search_result/reducer";
import {RootFavoriteScreen} from "../screen/favorite/RootFavoriteScreen";
import {removeAllPositionStayFavorite} from "../redux/favorite/reducer";
import {subsiteStore} from "../config/constants";
import {StandardDocScreen} from "../screen/standard_doc/StandardDocScreen";
import {RootStandardDocScreen} from "../screen/standard_doc/RootStandardDocScreen";
import {removeAllPositionStayStandardDoc} from "../redux/standard_doc/reducer";

const Tab = createBottomTabNavigator();

const ImageBottom = (size: number, color: string, path: any) => {
    return (
        <Image
            style={{width: size - 2, height: size - 2, tintColor: color}}
            source={path}
        />
    );
}
export const BottomNavigationContainer = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const currentLanguage = useSelector((state) => state.languages.currentLanguage);
    // @ts-ignore
    const translations = useSelector((state) => state.languages.translations);
    const currentTranslations = translations[currentLanguage];
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    const {currentSite} = useSelector((state: any) => state.sub_site);
    const {indexTab} = useSelector((state: any) => state.appbar);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, [currentSite]);
    const handleBackPress = () => {
        return true;
    };
    // @ts-ignore
    const getDataHomePageReClick = () => {
        const langId = currentLanguage === 'en' ? 1033 : 1066;
        dispatch(setHomePageState(true))
        // @ts-ignore
        dispatch(getViewDocumentNew({
            LangId: langId,
            Limit: 5,
            Offset: 0,
            Params: 'LangId,Offset,Limit',
            isConnected: isConnected
        }));
        // @ts-ignore
        dispatch(getDocumentFavorite({
            LangId: langId,
            Params: 'Offset,Limit',
            Offset: 0,
            Limit: 5,
            isConnected: isConnected
        }))
        // @ts-ignore
        dispatch(getDocumentMostView({
            LangId: langId,
            Params: 'LangId,CategoryId,Offset,Limit',
            CategoryId: 5,
            Offset: 0,
            Limit: 5,
            isConnected: isConnected
        }))
        // @ts-ignore
        dispatch(getRecentlyDoc())
    }

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={({route}) => ({
                headerShown: false,
                //unmountOnBlur: true,
                tabBarInactiveBackgroundColor: '#006885',
                tabBarActiveBackgroundColor: '#006885',
                tabBarActiveTintColor: '#DBA410',
                tabBarInactiveTintColor: '#FFFFFF',
                tabBarLabelStyle: {
                    fontSize: 12
                },
                tabBarStyle: {
                    backgroundColor: '#006885',
                    position: 'absolute',
                    borderTopWidth: 0,
                    paddingTop: 10,
                    paddingBottom:  Platform.OS === 'ios' ? 20: 5,
                    height: Platform.OS === 'ios' ? 77 :  50,
                },

            })}
        >
            <Tab.Screen name="Home" component={DashboardScreen} options={{
                headerShown: false,
                tabBarLabel: currentTranslations.bottomtab_home,
                tabBarIcon: ({size, color}) => {
                    return ImageBottom(size, color, require('assets/images/icon_bottom_home.png'));
                },
            }}
                        listeners={({navigation, route}) => ({
                            tabPress: (e) => {
                                getDataHomePageReClick();
                                dispatch(changeColumnFlatList(1))
                                dispatch(removeAllPositionStayCategory())
                                dispatch(removeAllPositionStayStandardDoc())
                                dispatch(removeAllPositionStayFavorite())
                                dispatch(setChildCategory(false))
                                dispatch(setChildStandardDoc(false))
                                dispatch(setChildFavorite(false))
                                dispatch(setIndexTab(0))
                            },
                        })}

            />
            {
                subsiteStore.getSubsite().includes("sqd") &&
                <Tab.Screen name="Document"
                            component={RootStandardDocScreen}
                            options={{
                                headerShown: false, tabBarLabel: currentTranslations.document,
                                tabBarIcon: ({size, color}) => {
                                    return ImageBottom(size, color, require('assets/images/icon_standard.png'));
                                },
                            }}
                            listeners={({navigation, route}) => ({
                                tabPress: (e) => {
                                    dispatch(setHomePageState(false))
                                    dispatch(removeAllPositionStayCategory())
                                    dispatch(removeAllPositionStayStandardDoc())
                                    dispatch(removeAllPositionStayFavorite())
                                    dispatch(setChildCategory(false))
                                    dispatch(setChildStandardDoc(false))
                                    dispatch(setChildFavorite(false))
                                    dispatch(setIndexTab(4))

                                },
                            })}
                />
            }
            <Tab.Screen name="Category"
                        component={RootCategoryScreen}
                        options={{
                            headerShown: false, tabBarLabel: currentTranslations.bottomtab_category,
                            tabBarIcon: ({size, color}) => {
                                return ImageBottom(size, color, require('assets/images/icon_bottom_categoties.png'));
                            },
                        }}
                        listeners={({navigation, route}) => ({
                            tabPress: (e) => {
                                dispatch(setHomePageState(false))
                                dispatch(removeAllPositionStayCategory())
                                dispatch(removeAllPositionStayFavorite())
                                dispatch(removeAllPositionStayStandardDoc())
                                dispatch(setChildCategory(false))
                                dispatch(setChildFavorite(false))
                                dispatch(setChildStandardDoc(false))
                                dispatch(setIndexTab(1))

                            },
                        })}
            />

            <Tab.Screen name="Search" component={SearchScreen} options={{
                headerShown: false,
                tabBarLabel: currentTranslations.bottomtab_search,
                tabBarIcon: ({size, color}) => {
                    return ImageBottom(size, color, require('assets/images/icon_bottom_search.png'));
                },
            }}
                        listeners={({navigation, route}) => ({
                            tabPress: (e) => {
                                dispatch(setHomePageState(false))
                                dispatch(setSearchTerm(""))
                                dispatch(removeAllPositionStayCategory())
                                dispatch(removeAllPositionStayFavorite())
                                dispatch(setChildCategory(false))
                                dispatch(setChildFavorite(false))
                                dispatch(setIndexTab(2))

                            },
                        })}
            />
            <Tab.Screen name="Favorite" component={RootFavoriteScreen}
                        options={{
                            headerShown: false, tabBarLabel: currentTranslations.bottomtab_favourite,
                            tabBarIcon: ({size, color}) => {
                                return ImageBottom(size, color, require('assets/images/icon_bottom_favorite.png'));
                            },
                        }}
                        listeners={({navigation, route}) => ({
                            tabPress: (e) => {
                                dispatch(setHomePageState(false))
                                dispatch(removeAllPositionStayCategory())
                                dispatch(removeAllPositionStayStandardDoc())
                                dispatch(removeAllPositionStayFavorite())
                                dispatch(setChildCategory(false))
                                dispatch(setChildFavorite(false))
                                dispatch(setChildStandardDoc(false))
                                dispatch(setIndexTab(3))

                            },
                        })}
            />

        </Tab.Navigator>
    );
}

