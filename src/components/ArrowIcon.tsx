import React from 'react';
import { Image } from 'react-native';

const ArrowIcon = () => {
    return (
        <Image
            source={require('assets/images/icon_arrow.png')}
            style={{ width: 15, height: 15 }}
            resizeMode="contain" // Change this to the desired resizeMode value

        />
    );
};

export default ArrowIcon;
