import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import { FontFamily,dimensWidth, dimnensHeight } from '../config/font';
import colors from '../config/colors';
const ButtonCusTom: any = ({children,i18nKey,borderColorCustom= colors.white, bgColorCustom = colors.orange,colorCustom =colors.white,...props}: any) => {

  return (
   <TouchableOpacity style={[styles.container,{ backgroundColor: bgColorCustom, borderColor: borderColorCustom,}]} {...props}>
     <Text allowFontScaling={false} style={{color:colorCustom,fontFamily: FontFamily.HERITAGE_REGULAR, lineHeight:18}} >
      {i18nKey}
    </Text>
   </TouchableOpacity>
  );
};
 const styles = StyleSheet.create({
  container: {
    height: dimnensHeight(42),
    width: dimensWidth(345),
    margin:10,
    borderRadius:3,
    justifyContent: 'center',
    alignItems:'center',
    borderWidth:1
   }
  })
export default React.memo(ButtonCusTom);
