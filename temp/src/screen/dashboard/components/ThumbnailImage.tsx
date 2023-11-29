import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {dimensWidth} from '../../../config/font';
import FastImage from 'react-native-fast-image';
import {isNullOrEmpty} from "../../../utils/function";

interface Props {
    onRetryPress?: () => any;
    urlOnline: string;
    priority?: any;
    resizeMode?: any;
    styleImg?: any;
}

const ThumbnailImage: FC<Props> = (props: Props) => {
    const { urlOnline = '', resizeMode, priority, styleImg = {} } = props;
    const [imageSource, setImageSource] = useState(
        !isNullOrEmpty(urlOnline)
            ? {
                uri: urlOnline,
                priority: priority ? priority : FastImage.priority.normal,
            }
            : require('assets/images/icon_thumbnail_default.png')
    );

    const onError = () => {
        setImageSource(require('assets/images/icon_thumbnail_default.png'));
    };

    return (
        <FastImage
            onError={onError}
            style={[styles.container, styleImg]}
            source={imageSource}
            defaultSource={require('assets/images/icon_thumbnail_default.png')}
            resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.contain}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        height: dimensWidth(40),
        width: dimensWidth(40),
        marginRight: dimensWidth(10),
        borderRadius: 0,
    },
});

export default React.memo(ThumbnailImage);
