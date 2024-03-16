import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { ThemeColors } from '@Theme/Colors';
import { useColors } from '@Theme/index';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedLine } from './AnimatedLine';

export const ChatEmptyState: React.FC<{ username: string }> = ({
  username,
}) => {
  const colors = useColors();

  const withcolors = styles(colors);
  const Card = useCallback(
    (props: { position: { x: number; y: number } }) => {
      const translate = {
        transform: [
          { translateX: props.position.x },
          { translateY: props.position.y },
        ],
      };

      return (
        <View style={[withcolors.card, translate]}>
          <AnimatedLine width={40} />
          <Separator size={'md'} />
          <AnimatedLine width={80} />
        </View>
      );
    },
    [colors]
  );

  return (
    <View style={withcolors.screen}>
      <View style={withcolors.body}>
        <Card position={{ x: 32, y: 90 }} />
        <Card position={{ x: -32, y: 20 }} />
      </View>
      <Separator size={'md'} />
      <Separator size={'md'} />
      <Separator size={'md'} />
      <Text weight="bold" fontSize={22} textAlign="center">
        It's nice to chat with someone
      </Text>
      <Separator />
      <Text fontSize={16} textAlign="center" weight="light">
        This conversation is just between you and{' '}
        <Text color={colors.cyan}>{username}</Text>. Take a look at their
        profile to learn more about them.
      </Text>
    </View>
  );
};

const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      minHeight: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 44,
      paddingHorizontal: 44,
    },
    body: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    card: {
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 32,
      backgroundColor: colors.background,
      width: '85%',
      height: 150,
      borderColor: colors.secondaryBackground,
      borderWidth: 3,
    },
  });

export default ChatEmptyState;
