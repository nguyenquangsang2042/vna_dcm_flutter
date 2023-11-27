
import React, { FC, useCallback, useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../../src/config/colors';
import { DEFAULT_LANGUAGE_TEXT } from '../../src/config/constants';
import { FontFamily, FontSize } from '../../src/config/font';

interface Props {
  onSelectSwitch: (languages: string) => void;
  selectionColor: () => void;
  selectionMode: (val: number) => void;
  navigation: Boolean;
  roundCorner: any;
  option1: any;
  option2: any;
  isLangueEn: Boolean;
  isLangueVi: Boolean;
}
const CustomSwitch: FC<Props> = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  isLangueEn,
  isLangueVi,
  selectionColor
}: Props) => {
  const [getSelectionMode, setSelectionMode] = useState(1);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = useCallback((languages: string, val: number) => {
    setSelectionMode(val);
    onSelectSwitch(languages);
  }, [onSelectSwitch, setSelectionMode]);

  console.log("isLangueVi in Custom swith =>>>> " + isLangueEn + isLangueVi)
  return (
    <View>
      <View
        style={{
          height: 30,
          width: 105,
          backgroundColor: 'white',
          borderRadius: getRoundCorner ? 15 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          bottom: 0,
          marginLeft: '-5%'
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(DEFAULT_LANGUAGE_TEXT.VIETNAM, 1)}
          // style={{
          //   flex: 1,

          //   backgroundColor: getSelectionMode == 1 && !isLangueVi ? selectionColor : 'white',
          //   borderRadius: getRoundCorner ? 15 : 0,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}>
          style={!isLangueVi ? styles.viewActiveLanguege : styles.viewInactiveLanguege}
          >
          <Text
            style={{
              color: 'black'//getSelectionMode == 1 ? 'black' : selectionColor,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(DEFAULT_LANGUAGE_TEXT.ENGLISH, 2)}

          style={!isLangueEn ? styles.viewActiveLanguege : styles.viewInactiveLanguege}
        // style={{
        //   flex: 1,

        //   backgroundColor: getSelectionMode == 2 && !isLangueEn ? selectionColor : 'white',
        //   borderRadius: getRoundCorner ? 15 : 0,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // }}>
        >
          <Text
            style={{
              color: 'black'//getSelectionMode == 2 ? 'white' : selectionColor,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInactiveLanguege: {
    fontSize: FontSize.SMALL,
    color: colors.text_grey26,
    fontWeight: '400',
    fontFamily: FontFamily.HERITAGE_REGULAR,
  },
  textActiveLanguege: {
    fontSize: FontSize.SMALL,
    color: colors.white,
    fontWeight: '400',
    fontFamily: FontFamily.HERITAGE_REGULAR,
  },
  viewInactiveLanguege: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  viewActiveLanguege: {
    flex: 1,
    backgroundColor: colors.orange,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
export default CustomSwitch;