import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import {ButtonProps} from './types';
import styles from './Button.styles';
import {Text} from '../../atoms';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '@Theme';

const Button: React.FC<ButtonProps> = ({children, onPress, style}) => {
  const colors = useColors();
  const backgroundColor = useMemo(
    () => ({
      backgroundColor: colors.background,
    }),
    [colors],
  );
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={[styles.buttonWrapper, style]}
        colors={[colors.cyan, colors.pink]}>
        <View style={[styles.button, backgroundColor]}>
          <Text weight="bold" fontSize={16}>
            {children}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;
