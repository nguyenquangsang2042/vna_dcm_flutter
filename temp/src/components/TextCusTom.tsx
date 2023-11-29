import React, {FC} from 'react';
import {Text} from 'react-native';
const TextCustom: any = ({children,i18nKey,...props}: any) => {

  return (
    <Text allowFontScaling={false} {...props}>
      {i18nKey}
      {children}
    </Text>
  );
};
export default React.memo(TextCustom);
