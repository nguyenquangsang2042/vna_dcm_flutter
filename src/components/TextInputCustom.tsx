import React, {FC} from 'react';
import {TextInput, TextInputProps} from 'react-native';

const TextInputCustom: FC<TextInputProps> = ({
  style,
  editable,
  multiline,
  numberOfLines,
  value,
  onChangeText,
  maxLength,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      allowFontScaling={false}
      editable={editable}
      multiline={multiline}
      numberOfLines={numberOfLines}
      maxLength={maxLength}
      autoCapitalize="none"
      onChangeText={onChangeText}
      value={value}
      style={style}
    />
  );
};
export default React.memo(TextInputCustom);
