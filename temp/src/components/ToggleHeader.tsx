import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { index } from "cheerio/lib/api/traversing";

// @ts-ignore
const ToggleHeader = ({ changeIndex, text1, text2, styleContainer }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSelect = (index: React.SetStateAction<number>) => {
        setSelectedIndex(index);
        changeIndex(index);
    };
    return (
        <View style={styleContainer}>
            <View style={[{
                width: '50%', height: 30,
                justifyContent: 'center',
                alignItems: 'center',
            }, selectedIndex == 0 && styles.selectedTab]}>
                <TouchableOpacity style={{ width: '100%', 
                    justifyContent: 'center',
                    alignItems: 'center',
                
                }} onPress={() => handleSelect(0)}>
                    <Text style={[styles.text, selectedIndex === 0 && styles.selectedText]}>{text1}</Text>
                </TouchableOpacity>
            </View>
            <View style={[{ width: '50%',  height: 30,
                 justifyContent: 'center',
                 alignItems: 'center',
        }, selectedIndex == 1 && styles.selectedTab]}>
                <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={() => handleSelect(1)}>
                    <Text style={[styles.text, selectedIndex === 1 && styles.selectedText]}>{text2}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    selectedTab: {
        width: '50%',
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        height: 30
    },
    text: {
        fontSize: 16,
        color:'#0C121D',
        fontWeight: '300',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#006885',
    },
});

export default ToggleHeader;
