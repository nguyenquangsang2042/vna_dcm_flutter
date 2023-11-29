import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// @ts-ignore
const ItemMenuBottom = ({ onPress, pathImageLeft, rightView, text, showLine, textColor }) => {
    return (
        onPress ? (
            <TouchableOpacity onPress={onPress}>
                <MenuItem
                    pathImageLeft={pathImageLeft}
                    rightView={rightView}
                    text={text}
                    showLine={showLine}
                    textColor={textColor}
                />
            </TouchableOpacity>
        ) : (
            <MenuItem
                pathImageLeft={pathImageLeft}
                rightView={rightView}
                text={text}
                showLine={showLine}
                textColor={textColor}
            />
        )
    );
};
// @ts-ignore
const MenuItem = ({ pathImageLeft, rightView, text, showLine, textColor }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={pathImageLeft} style={styles.leftImage} />
            </View>
            <View style={styles.centerContainer}>
                <Text style={[styles.centerText, { color: textColor }]}>{text}</Text>
                {rightView && (
                    <View style={styles.rightViewContainer}>
                        {rightView}
                    </View>
                )}
            </View>
            {showLine && <View style={styles.line} />}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:10
    },
    leftContainer: {
        marginRight: 16,
    },
    leftImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    centerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    centerText: {
        fontSize: 14,
        fontFamily: 'heritage_regular',
        lineHeight: 15,
    },
    rightViewContainer: {
        marginLeft: 16,
    },
    line: {
        marginTop: 8,
        height: 1,
        width: '100%',
        backgroundColor: 'black',
    },
});

export default ItemMenuBottom;
