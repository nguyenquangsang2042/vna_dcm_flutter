import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

// @ts-ignore
const TouchableOption = ({ active, onPress, label }) => {
    return (
        <TouchableOpacity style={{ width: '33%', padding: 5 }} onPress={onPress}>
            <View
                style={[
                    {
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                    },
                    active && { backgroundColor: '#006885', borderColor: 'white' },
                ]}
            >
                <Text style={active && { color: 'white' }}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TouchableOption;
