import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  LayoutChangeEvent,
  Modal,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useColors } from '@Theme/index';
import BoldIcon from '@Icons/Bold';
import CodeIcon from '@Icons/Code';
import ImageIcon from '@Icons/Image';
import ItalicIcon from '@Icons/Italic';
import MentionIcon from '@Icons/Mention';
import QuoteIcon from '@Icons/Quote';
import TableIcon from '@Icons/Table';
import { useMarkdownStyles } from '@Utils/useMarkdownStyles';
import { Blur, Icon, Text } from '..';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from '@Theme/Colors';
import styles from './styles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import StarsIcon from '@Icons/StarsIcon';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { IMAGE_TEMPLATE, QUOTE_TEMPLATE, TABLE_TEMPLATE } from './Templates';
import { AiInput } from './AI/Input';

export const RichTextEditor: React.FC<{
  onChangeText: (text: string) => void;
  value: string;
}> = ({ value, onChangeText }) => {
  const colors = useColors();
  const markdownStyle = useMarkdownStyles();
  const [review, setReview] = useState<boolean>(false);
  const { textColor, backgroundColor, screenStyle } = useStyles();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [barHeight, setBarHeight] = useState<number>(0);
  const [expand, setExpand] = useState<boolean>(false);
  const [gemini, setGemini] = useState(false);
  const [selection, setSelection] = useState<{ end: number; start: number }>({
    end: 0,
    start: 0,
  });
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setBarHeight(event.nativeEvent.layout.height);
    },
    [value]
  );

  const onTablePressed = useCallback(
    () => onChangeText(embedTemplate(TABLE_TEMPLATE)),
    [value]
  );

  const onQuotePressed = useCallback(
    () => onChangeText(embedTemplate(QUOTE_TEMPLATE)),
    [value]
  );
  const onImagePressed = useCallback(
    () => onChangeText(embedTemplate(IMAGE_TEMPLATE)),
    [value]
  );

  const onGeminiPressed = useCallback(() => {
    setGemini(!gemini);
  }, [gemini]);

  const onItalicPressed = () => {
    const arr = value.split('');
    const text = value.substring(selection.start, selection.end);
    arr.splice(selection.start, text.length, `*${text}*`);
    onChangeText(arr.join(''));
  };
  const onBoldPressed = () => {
    const arr = value.split('');
    const text = value.substring(selection.start, selection.end);
    arr.splice(selection.start, text.length, `**${text}**`);
    setSelection((prev) => ({
      start: prev.start + 2,
      end: 10,
    }));
    onChangeText(arr.join(''));
  };

  const embedTemplate = useCallback(
    (template: string) => {
      if (value === '') return template;
      return value + '\n\n' + template;
    },
    [value]
  );
  const actionBar = useMemo(
    () => [
      { icon: BoldIcon, onPress: onBoldPressed },
      { icon: CodeIcon },
      { icon: ImageIcon, onPress: onImagePressed },
      { icon: ItalicIcon, onPress: onItalicPressed },
      { icon: MentionIcon },
      { icon: QuoteIcon, onPress: onQuotePressed },
      { icon: TableIcon, onPress: onTablePressed },
      { icon: StarsIcon, onPress: onGeminiPressed },
    ],
    [value, selection, gemini]
  );
  const editor = useCallback(() => {
    return (
      <>
        <Blur onLayout={onLayout} style={[styles.bar]}>
          <>
            <View
              style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              {actionBar.map((item, index) => {
                return (
                  <Animated.View
                    key={index}
                    layout={FadeIn}
                    entering={FadeIn.delay(index * 100)}
                    style={styles.item}>
                    <Pressable onPress={item.onPress}>
                      {<item.icon />}
                    </Pressable>
                  </Animated.View>
                );
              })}
              <Pressable onPress={() => setExpand(!expand)}>
                <Icon name={'expand-outline'} />
              </Pressable>
            </View>
            {value ? (
              <Pressable
                onPress={() => setReview(!review)}
                style={{ flex: 0.2, alignItems: 'flex-end' }}>
                <Text fontSize={12} exiting={FadeOut} weight="bold">
                  {review ? 'Edit' : 'Review'}
                </Text>
              </Pressable>
            ) : null}
          </>
        </Blur>
        {gemini && <AiInput />}
        {review && value ? (
          <ScrollView
            style={[
              styles.preview,
              backgroundColor,
              {
                maxHeight: expand
                  ? 'auto'
                  : height - barHeight - insets.bottom - insets.top - 40,
              },
            ]}
            contentContainerStyle={{
              paddingBottom: insets.bottom * 2,
            }}>
            <SafeAreaView edges={['bottom']}>
              <Markdown style={markdownStyle}>{value}</Markdown>
            </SafeAreaView>
          </ScrollView>
        ) : !gemini ? (
          <BottomSheetTextInput
            multiline
            placeholderTextColor={colors.text}
            placeholder="Message"
            value={value}
            removeClippedSubviews={true}
            selectionColor={colors.text}
            selection={selection}
            onSelectionChange={({ nativeEvent: { selection } }) => {
              setSelection(() => ({ ...selection }));
            }}
            onChangeText={onChangeText}
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            autoFocus={expand || value.length > 0}
            style={[
              styles.input,
              textColor,
              { maxHeight: expand ? 'auto' : height / 2 - 100 },
            ]}
          />
        ) : null}
      </>
    );
  }, [value, review, expand, selection, colors, gemini]);

  if (expand)
    return (
      <Modal
        presentationStyle="pageSheet"
        animationType="fade"
        visible={expand}
        onRequestClose={() => setExpand(false)}>
        <SafeAreaView style={screenStyle}>{editor()}</SafeAreaView>
      </Modal>
    );

  return editor();
};
