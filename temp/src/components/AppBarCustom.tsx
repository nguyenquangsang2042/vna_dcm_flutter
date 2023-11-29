import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

// @ts-ignore
export const AppBarCustom = ({title, navigation, RightControl, onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch} onPress={() => {
                if (onPress == null) {
                    navigation.pop();
                }
                else {
                    onPress();
                }
            }}>
                <Image
                    style={styles.image}
                    source={require('assets/images/icon_back.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            {RightControl != null && (
                <RightControl/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginTop: 5,
        color: '#006885',
        fontSize: 20,
        fontFamily: 'heritage_bold',
        lineHeight: 24,
        flex: 1
    },
    image: {
        height: 30,
        width: 30,
        marginLeft: 10
    },
    touch: {
        padding: 6
    },
    rightControl: {
        // Tùy chỉnh kiểu dáng của control bên phải ở đây
    },
    container: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    }
});
