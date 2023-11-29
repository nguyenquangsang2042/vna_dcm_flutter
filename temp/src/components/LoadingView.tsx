import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../config/colors';
const LoadingView = (props: any) => {
  const {
    isLoading = false,
    viewLoadingStyle,
    color = 'blue',
    bgColor,
    isLarge = false,
  } = props;
  if (!isLoading) {
    return null;
  }
  return (
    <View
      style={[
        styles.viewLoading,
        bgColor && {backgroundColor: bgColor},
        viewLoadingStyle && viewLoadingStyle,
      ]}>
      <ActivityIndicator color={color} size={isLarge ? 'large' : 'small'} />
    </View>
  );
};
const styles = StyleSheet.create({
  viewLoading: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1333333)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(LoadingView);
