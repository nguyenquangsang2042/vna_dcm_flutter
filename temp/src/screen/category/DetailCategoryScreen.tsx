import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Animated,
    ImageBackground
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/stores";
import {addPositionStayCategory} from "../../redux/category/reducer";
import {DocumentAreaCategory} from "services/database/models/DocumentAreaCategory";
import {NoDataView} from "components/index";
import {useNavigation} from "@react-navigation/native";
import loadMoreListReducer, {changeColumnFlatList} from "../../redux/list_load_more/reducer";
import {ListDetailCategoryScreen} from "./ListDetailCategoryScreen";
import {ThumpDetailCategoryScreen} from "./ThumpDetailCategoryScreen";

// @ts-ignore
const LeftMenu = ({isOpen, onClose, onMenuItemClick, menuItems}) => {
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const closeMenu = () => {
        Animated.timing(slideAnimation, {
            toValue: -200,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    if (isOpen) {
        slideAnimation.setValue(0);
    }

    return (
        <Animated.View
            style={[
                styles.menuContainer,
                isOpen ? styles.openMenu : styles.closedMenu,
                {transform: [{translateX: slideAnimation}]},
            ]}
        >
            {
                menuItems.length != 0 ? menuItems.map((item: any) => (
                        <TouchableOpacity
                            key={item.PrimaryKey}
                            onPress={() => {
                                onMenuItemClick(item);
                                closeMenu(); // Close the menu when an item is clicked
                            }}
                        >
                            <Text
                                style={styles.menuItem}>{currentLanguage !== 'en' ? item["Title"] : item["TitleEN"]}</Text>
                        </TouchableOpacity>
                    )) :
                    <NoDataView/>
            }
        </Animated.View>
    );
};

export const DetailCategoryScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menus, setMenus] = useState();
    const currentLanguage = useSelector((state: any) => state.languages.currentLanguage);
    const {columnFlatlist} = useSelector((state: any) => state.loadMoreList);
    const langId = currentLanguage === 'en' ? 1033 : 1066;

    // @ts-ignore
    const {positionStayCategory} = useSelector((state: RootState) => state.category);
    useEffect(() => {
        DocumentAreaCategory.getChildByParentId(positionStayCategory[positionStayCategory.length - 1].PrimaryKey).then(values => {
             setMenus(values);
        })
    }, [positionStayCategory]);
    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleMenuItemClick = (item: any) => {
        dispatch(addPositionStayCategory(item))
    };

    const overlayRef = useRef(null);

    const handleOverlayClick = () => {
        if (isMenuOpen) {
            closeMenu();
        }
    };
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleOverlayClick}>
                <View ref={overlayRef} style={isMenuOpen ? styles.overlay : null}/>
            </TouchableWithoutFeedback>
            <View style={styles.headerContainer}>
                <View style={{padding: 10}}>
                    <TouchableOpacity onPress={openMenu}>
                        <Image
                            style={{height: 30, width: 30}}
                            source={require('assets/images/icon_menu.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{currentLanguage === 'en' ?
                        positionStayCategory[positionStayCategory.length - 1].TitleEN :
                        positionStayCategory[positionStayCategory.length - 1].Title}
                    </Text>
                </View>
                <View style={{padding: 10}}>
                    <TouchableOpacity onPress={()=>{
                        dispatch(changeColumnFlatList(columnFlatlist==1?2:1))
                    }}>
                        <Image
                            style={styles.image}
                            source={columnFlatlist==1?require('assets/images/icon_show_thumb.png'):require('assets/images/icon_show_list.png')}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ImageBackground source={require('assets/images/background.png')} style={{
                height: '100%',
                width: "100%"
            }}>
                {
                    columnFlatlist==1?
                        <ListDetailCategoryScreen/>:
                        <ThumpDetailCategoryScreen/>
                }

            </ImageBackground>

            {isMenuOpen && (
                <LeftMenu isOpen={isMenuOpen} onClose={closeMenu} onMenuItemClick={handleMenuItemClick}
                          menuItems={menus}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    image:{
        height: 30,
        width: 30
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#006885',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'heritage_bold',
        lineHeight: 20
    },
    container: {
        flex: 1,
        marginBottom:50
    },
    menuContainer: {
        position: 'absolute',
        top: 50,
        left: -200, // Adjust the left position to control menu visibility
        width: 300, // Set the width of the menu
        height: '100%',
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderColor: '#ccc',
        zIndex: 999, // Ensure the menu is above other components
    },
    openMenu: {
        left: 0,
    },
    closedMenu: {
        left: -200,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent', // Use transparent background to capture taps
        zIndex: 998, // Ensure the overlay is above other components, but below the menu
    },
});
