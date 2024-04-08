import GeminiButton from '@Atoms/GeminiButton';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useStyles } from '@Theme/Colors';
import { useColors } from '@Theme/index';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import MaskedView from '@react-native-masked-view/masked-view';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const AiInput: React.FC = () => {
  const colors = useColors();
  const [toggleInput, setInput] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const { textColor, borderColor } = useStyles();

  useEffect(() => {
    if (value === '') {
      setInput(false);
    }
  }, [value]);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <View style={[borderColor, styles.radius]}>
        {toggleInput ? (
          <BottomSheetTextInput
            onChangeText={setValue}
            autoFocus
            selectionColor={colors.pink}
            value={value}
            multiline
            style={[textColor, styles.mainInput]}
            onBlur={() => {
              if (!value) {
                setInput(false);
              }
            }}
          />
        ) : (
          <MaskedView
            maskElement={
              <View style={styles.fakeInput}>
                {'Message Gemini!'.split('').map((item, index) => (
                  <Text key={index} entering={FadeIn.delay(index * 30)}>
                    {item}
                  </Text>
                ))}
              </View>
            }>
            <Pressable onPress={() => setInput(true)}>
              <LinearGradient
                colors={[colors.pink, colors.cyan]}
                style={styles.lg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Pressable>
          </MaskedView>
        )}
      </View>
      <Separator />
      <GeminiButton />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  radius: {
    borderRadius: 8,
  },
  mainInput: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  fakeInput: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
  },
  lg: {
    width: '50%',
    height: 48,
  },
});
