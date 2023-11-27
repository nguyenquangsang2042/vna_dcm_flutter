import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {dimensWidth} from '../config/font';
import FastImage from 'react-native-fast-image';
import {isNullOrEmpty} from "../utils/function";

interface Props {
  onRetryPress?: () => any;
  urlOnline: string;
  priority?: any;
  resizeMode?: any;
  styleImg?: any;
  defaultImage:any;
}

export const FastImageCustom: FC<Props> = (props: Props) => {
  const {urlOnline = '', resizeMode, priority,defaultImage, styleImg = {}} = props;
  const [imageSource, setImageSource] = useState(
      !isNullOrEmpty(urlOnline)
          ? {
            uri: props.urlOnline,
            priority: priority ? priority : FastImage.priority.normal,
          }
          : defaultImage
  );

  const onError = () => {
    setImageSource(defaultImage);
  };
  return (
      <FastImage
          onError={onError}
          style={[styles.container, styleImg]}
          source={imageSource}
          defaultSource={defaultImage}
          resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.contain}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    height: dimensWidth(40),
    width: dimensWidth(40),
    marginRight: dimensWidth(10),
    borderRadius: dimensWidth(20),
  },
});

