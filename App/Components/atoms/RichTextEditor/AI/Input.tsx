import GeminiButton from '@Atoms/GeminiButton';
import HeaderLoader from '@Atoms/HeaderLoader';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useGemini } from '@Hooks/useGemini';
import { CopyIcon } from '@Icons/Copy';
import { useStyles } from '@Theme/Colors';
import { useColors } from '@Theme/index';
import { useMarkdownStyles } from '@Utils/useMarkdownStyles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import MaskedView from '@react-native-masked-view/masked-view';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Markdown from 'react-native-markdown-display';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';

export const AiInput: React.FC = () => {
  const colors = useColors();
  const [toggleInput, setInput] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const { textColor, borderColor } = useStyles();
  const { ask, loading } = useGemini();
  const style = useMarkdownStyles();
  const insets = useSafeAreaInsets();
  const [answer, setAnswer] = useState<string>('');
  const { setTextMessage } = useMessageInputContext();
  const copy = useCallback(async () => {
    await Clipboard.setStringAsync(answer);
    setTextMessage(answer);
  }, [answer]);

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
      {value && (
        <GeminiButton
          loading={loading}
          onPress={() => {
            ask(value).then(setAnswer);
          }}
        />
      )}
      <Separator size={'md'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 + insets.bottom }}>
        {loading ? <HeaderLoader /> : null}
        <Markdown style={style}>{answer}</Markdown>
      </ScrollView>
      <Separator size={'md'} />
      {answer !== '' && (
        <Pressable
          onPress={copy}
          android_ripple={{ color: colors.pink }}
          style={[
            styles.fab,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              bottom: 220 + insets.bottom,
              shadowColor: colors.text,
              marginTop: 22,
            },
          ]}>
          <CopyIcon />
        </Pressable>
      )}
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
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6.27,
    elevation: 10,
    alignSelf: 'flex-end',
  },
});
