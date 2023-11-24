import { Separator, Text } from '@Atoms';
import { Button } from '@Molecules';
import { useColors } from '@Theme';
import React from 'react';
import { Modal, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import useAlert from '../../../Context/AlertContext/AlertContext';
import AlertStyles from './Alert.styles';

export const Alert: React.FC = () => {
  const colors = useColors();
  const styles = AlertStyles(colors);
  const { visible, title, subtitle, onPress } = useAlert();
  return (
    <Modal transparent visible={visible} animationType={'fade'}>
      <Animated.View
        entering={FadeInDown.duration(1000)}
        style={styles.container}>
        <View style={styles.body}>
          <Text weight="bold" fontSize={22}>
            {title}
          </Text>
          <Separator />
          <Text>{subtitle}</Text>
          {onPress ? (
            <>
              <Separator size="md" />
              <Separator size="md" />
              <Button onPress={onPress}>Join</Button>
            </>
          ) : null}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default Alert;
