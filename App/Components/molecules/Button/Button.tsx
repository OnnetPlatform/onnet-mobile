import { useColors } from '@Theme';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '../../atoms';
import styles from './Button.styles';
import { ButtonProps } from './types';
import { useStyles } from '@Theme/Colors';

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  style,
  variant = 'REGULAR',
}) => {
  const colors = useColors();
  const { backgroundColor } = useStyles();

  const renderShadowButton = useCallback(() => {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.pink }}
        style={[
          styles.shadow,
          backgroundColor,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            shadowColor: colors.text,
            marginTop: 22,
          },
          style,
        ]}>
        {children}
      </Pressable>
    );
  }, [style, children, onPress]);

  if (variant === 'SHADOW') return renderShadowButton();

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={[styles.buttonWrapper, style]}
        colors={[colors.cyan, colors.pink]}>
        <View style={[styles.button, backgroundColor]}>
          <Text weight="bold" style={styles.textButton} fontSize={16}>
            {children}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;
