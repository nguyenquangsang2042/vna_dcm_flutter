import React, {Children, FC, useEffect, useState} from 'react';
import {Modal} from 'react-native';

interface Props {
  children: React.ReactNode;
  visible: Boolean;
  transparent?: Boolean;
  props: FC<Props>;
  onCloseModalCustom: () => void;
}
const ModalCusTom: FC<Props> = ({
  children,
  visible = false,

  ...props
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // @ts-ignore
    setModalVisible(visible);
  }, [visible]);

  return (
    <Modal transparent={true} visible={modalVisible} {...props}>
      <>{children}</>
    </Modal>
  );
};
export default React.memo(ModalCusTom);
